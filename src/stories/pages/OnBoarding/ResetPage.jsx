import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Checker from "../../components/Common/Checker";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import Logo from "./Logo";
import CryptoJS from "crypto-js";
import { encryptAES } from "../../../axioses/SignUpHandler";
import { Buffer } from "buffer";
import { Spinner } from "../../components/Common/Spinner";

const ResetPage = () => {
    const { width: windowSize } = useWindowSize();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordValid, setPasswordValid] = useState({
        lengthValid: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === "password" || name === "confirmPassword") {
            const { password, confirmPassword } = {
                ...formData,
                [name]: value,
            };

            if (name === "password") {
                const { lengthValid, hasNumber, hasSpecialChar } =
                    validatePassword(value);
                setPasswordValid({ lengthValid, hasNumber, hasSpecialChar });
            }

            if (name === "confirmPassword") {
                if (password !== confirmPassword) {
                    setErrorMessage("비밀번호가 일치하지 않습니다.");
                } else {
                    setErrorMessage("");
                }
            }
        }
    };

    const validatePassword = (password) => {
        const lengthValid = password.length >= 8 && password.length <= 12;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return { lengthValid, hasNumber, hasSpecialChar };
    };
    // 렌더링 되는 페이지에서 setIsLoading(false)를 하면 Too Many Renders 오류가 발생
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (step > 1) {
            setIsLoading(false);
        }
    }, [step]);

    const handleNext = async () => {
        if (validateStep()) {
            try {
                if (step === 1) {
                    setIsLoading(true);
                    const response = await BaseAxios.post(
                        "/api/l/findPassword/email",
                        { email: formData.email }
                    );
                    if (response.status === 200) {
                        setStep(2);
                    } else if (response.status === 201) {
                        setErrorMessage("가입되지 않은 이메일입니다.");
                        alert("가입되지 않은 이메일입니다.");
                    } else {
                        setErrorMessage(
                            "이메일 전송에 실패했습니다. 다시 시도해 주세요."
                        );
                    }
                } else if (step === 2) {
                    const response = await BaseAxios.post(
                        "/api/l/findPassword/emailAuthNum",
                        {
                            email: formData.email,
                            authNum: formData.confirmEmail,
                        }
                    );
                    if (response.status === 200) {
                        setStep(3);
                    } else {
                        setErrorMessage(
                            "인증번호가 올바르지 않습니다. 다시 입력해 주세요."
                        );
                    }
                }
            } catch (error) {
                setIsLoading(false);
                console.error("Error:", error);
                setErrorMessage("오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const randomBytes = CryptoJS.lib.WordArray.random(16).toString();
            let key = CryptoJS.PBKDF2(formData.email, randomBytes, {
                keySize: 32 / 4, // 32 bytes = 256 bits, keySize is in words (4 bytes each)
                iterations: 1000,
                hasher: CryptoJS.algo.SHA256,
            });
            key = Buffer.from(key.toString(CryptoJS.enc.Hex), "hex");
            console.log(formData.confirmEmail);
            let ib = CryptoJS.PBKDF2(formData.confirmEmail, randomBytes, {
                keySize: 16 / 4, // 16 bytes = 128 bits, keySize is in words (4 bytes each)
                iterations: 1000,
                hasher: CryptoJS.algo.SHA256,
            });
            ib = Buffer.from(ib.toString(CryptoJS.enc.Hex), "hex");
            console.log(key, ib);
            const encryptedPassword = encryptAES(formData.password, key, ib);
            const response = await BaseAxios.post(
                "/api/l/findPassword/changePassword",
                {
                    email: formData.email,
                    newPassword: encryptedPassword,
                    iv: randomBytes,
                }
            );
            if (response.status === 200) {
                console.log("비밀번호가 성공적으로 변경되었습니다.");
                navigate("/login");
            } else {
                setErrorMessage(
                    "비밀번호 변경에 실패했습니다. 다시 시도해 주세요."
                );
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const validateStep = () => {
        switch (step) {
            case 1:
                return formData.email.trim() !== "";
            case 2:
                return formData.confirmEmail.trim() !== "";
            case 3:
                const { lengthValid, hasNumber, hasSpecialChar } =
                    passwordValid;
                return (
                    formData.password.trim() !== "" &&
                    formData.password === formData.confirmPassword &&
                    lengthValid &&
                    hasNumber &&
                    hasSpecialChar
                );
            default:
                return false;
        }
    };

    const renderButtons = () => {
        const isStepValid = validateStep();

        return (
            <>
                <Button
                    label={step === 3 ? "완료" : "다음"}
                    onClick={step === 3 ? handleSubmit : handleNext}
                    backgroundColor="#434B60"
                    hoverBackgroundColor="#5A6480"
                    disabled={!isStepValid || isLoading}
                />
                {isLoading && (
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <Spinner color="#434B60" size={32} />
                        <LoadingMessage>인증번호 전송 중</LoadingMessage>
                    </div>
                )}
            </>
        );
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <StepDescription>
                            <Title>
                                비밀번호를 재설정할<br></br> 아이디를 입력해
                                주세요
                            </Title>
                        </StepDescription>
                        <TextFieldsWrapper>
                            <TextField
                                label="아이디 (이메일)"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                            />
                        </TextFieldsWrapper>
                    </>
                );
            case 2:
                return (
                    <>
                        <StepDescription>
                            <Title>
                                {formData.email}로 <br></br>전송된 인증번호를
                                입력해주세요
                            </Title>
                        </StepDescription>
                        <TextFieldsWrapper>
                            <TextField
                                label="인증번호"
                                value={formData.confirmEmail}
                                onChange={handleChange}
                                name="confirmEmail"
                            />
                        </TextFieldsWrapper>
                        <div
                            style={{
                                marginTop: "-10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <Button
                                label="인증번호 재전송"
                                width="160px"
                                height="40px"
                                color="#434B60"
                                hoverColor="#434B60"
                                backgroundColor="#e2e5e9"
                                hoverBackgroundColor="#ACB2BB"
                                onClick={() => handleNext()}
                            />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <StepDescription>
                            <Title>비밀번호 입력 및 확인</Title>
                            <Subtitle>
                                비밀번호와 확인 비밀번호를 입력해 주세요.
                            </Subtitle>
                        </StepDescription>
                        <TextFieldsWrapper>
                            <TextField
                                label="새 비밀번호"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                            />
                            <TextField
                                label="새 비밀번호 확인"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                            />
                            {errorMessage && (
                                <ErrorText>{errorMessage}</ErrorText>
                            )}
                            <div
                                style={{
                                    marginTop: "-15px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    width: { windowSize },
                                }}
                            >
                                <Checker
                                    text="비밀번호는 8~12자 이내로 입력하세요."
                                    type="check"
                                    readOnly={true}
                                    checked={passwordValid.lengthValid}
                                />
                                <Checker
                                    text="숫자를 포함하세요."
                                    type="check"
                                    readOnly={true}
                                    checked={passwordValid.hasNumber}
                                />
                                <Checker
                                    text="특수문자를 포함하세요."
                                    type="check"
                                    readOnly={true}
                                    checked={passwordValid.hasSpecialChar}
                                />
                            </div>
                        </TextFieldsWrapper>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Wrapper maxWidth={windowSize}>
            <FormWrapper maxWidth={windowSize}>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
                {renderStepContent()}

                {renderButtons()}
            </FormWrapper>
        </Wrapper>
    );
};

export default ResetPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const FormWrapper = styled.div`
    position: fixed;
    top: 15%;

    width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding: ${(props) => (props.maxWidth > 430 ? "0px" : "0 20px")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const ButtonWrapper = styled.div`
    position: fixed;
    bottom: 15%;
    display: flex;
    justify-content: ${({ buttonCount }) =>
        buttonCount === 1 ? "center" : "space-between"};
    margin-top: 20px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding: 0 10px;
    box-sizing: border-box;
    gap: 10px;
`;

const SigninWrapper = styled.div`
    position: fixed;
    bottom: 15%;
    margin-bottom: -70px;
`;

const StepDescription = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: -10px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin: 0;
    color: #434b60;
    text-align: center;
`;

const Subtitle = styled.p`
    font-size: 18px;
    margin: 0;
    color: #6c757d;
`;

const TextFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
`;

const ErrorText = styled.p`
    color: red;
    margin-top: -10px;
    font-size: 14px;
`;

const LogoWrapper = styled.div`
    width: 100%;
    height: 100px;
`;

const LoadingMessage = styled.p`
    margin-top: 10px;
    color: #434b60;
    font-size: 14px;
`;
