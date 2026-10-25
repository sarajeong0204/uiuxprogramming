
const serviceName = "Sarajeong Interior Decor";
let isSubscribed = false;
let submitCount = 0;

// 요소 선택
const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

function makeSubscribeMessage(email, subscribed) {
    if (subscribed) {
        return email + "로 뉴스레터 구독이 완료되었습니다.";
    }
    return "이메일을 입력한 뒤 버튼을 눌러 주세요.";
}

// 1. 뉴스레터 구독
if (subscribeForm && emailInput && subscribeButton && subscribeMessage) {
    subscribeForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (isSubscribed) return;

        const subscriberEmail = emailInput.value.trim();

        if (!subscriberEmail) {
            subscribeMessage.textContent =
                "이메일을 입력한 뒤 버튼을 눌러 주세요.";
            subscribeMessage.classList.remove("is-success");
            emailInput.focus();
            return;
        }

        if (!emailInput.validity.valid) {
            subscribeMessage.textContent =
                "올바른 이메일 주소를 입력해 주세요.";
            subscribeMessage.classList.remove("is-success");
            emailInput.focus();
            return;
        }

        isSubscribed = true;
        submitCount += 1;

        subscribeMessage.textContent =
            makeSubscribeMessage(subscriberEmail, isSubscribed);
        subscribeMessage.classList.add("is-success");

        subscribeButton.textContent = "구독 완료";
        subscribeButton.disabled = true;
    });
}

// 2. 다크 모드
const themeButton = document.querySelector("#themeButton");

if (themeButton) {
    themeButton.addEventListener("click", function() {
        const isDark = document.body.classList.toggle("dark");

        themeButton.textContent = isDark
            ? "라이트 테마로 바꾸기"
            : "다크 테마로 바꾸기";
    });
}

// 3. 닉네임 글자 수 표시
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");

function handleNicknameInput() {
    if (!nicknameInput || !nicknameCount) return;

    const maxLength = nicknameInput.maxLength;
    const currentLength = nicknameInput.value.length;

    nicknameCount.textContent =
        currentLength + "/" + (maxLength > 0 ? maxLength : "제한 없음");
}

if (nicknameInput && nicknameCount) {
    nicknameInput.addEventListener("input", handleNicknameInput);
    handleNicknameInput();
}

// 4. 약관 동의 및 상담 시작
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleAgreeChange() {
    if (!agreeCheck || !startButton || !agreeMessage) return;

    const agreed = agreeCheck.checked;

    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed
        ? "약관에 동의하셨습니다."
        : "약관에 동의하셔야 시작할 수 있습니다.";

    agreeMessage.classList.toggle("is-ready", agreed);
}

if (agreeCheck && startButton && agreeMessage) {
    agreeCheck.addEventListener("change", handleAgreeChange);
    handleAgreeChange();
}

// 5. 탭 전환
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function(tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });

    panels.forEach(function(panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab) {
    const targetSelector = clickedTab.dataset.target;

    if (!targetSelector) return;

    const targetPanel = document.querySelector(targetSelector);

    if (!targetPanel || !document.querySelector(".panel" + targetSelector)) {
        // 아래의 ID 기반 탐색을 사용해 실제 패널을 확인합니다.
        if (!targetPanel || !targetPanel.classList.contains("panel")) return;
    }

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

tabs.forEach(function(tab) {
    tab.addEventListener("click", function(event) {
        resetTabsAndPanels();
        activateTab(event.currentTarget);
    });
});

// 6. 상담 신청 단계
const trainingFlow = document.querySelector("#training-flow");

if (trainingFlow) {
    const flowSteps = trainingFlow.querySelectorAll(".step");
    const progressItems = trainingFlow.querySelectorAll(".progress_item");

    const titleInput = document.querySelector("#presentation-title");
    const titleError = document.querySelector("#title-error");
    const titleNext = document.querySelector("#title-next");

    const durationRange = document.querySelector("#duration-range");
    const durationValue = document.querySelector("#duration-value");
    const qnaOption = document.querySelector("#qna-option");
    const qnaOptions = document.querySelector("#qna-options");

    const optionPrev = document.querySelector("#survey-prev");
    const optionNext = document.querySelector("#survey-next");
    const summaryPrev = document.querySelector("#summary-prev");
    const finishButton = document.querySelector("#finish-button");
    const restartButton = document.querySelector("#restart-button");

    const summaryTitle = document.querySelector("#summary-title");
    const summaryDuration = document.querySelector("#summary-duration");
    const summaryQna = document.querySelector("#summary-qna");

    const recordingDialog = document.querySelector("#recording-dialog");
    const recordingCancel = document.querySelector("#recording-cancel");
    const recordingConfirm = document.querySelector("#recording-confirm");

    const durationValues = ["3", "5", "10"];

    const formData = {
        title: "",
        duration: "5",
        qna: false,
        qnaCount: "2"
    };

    function showStep(index) {
        flowSteps.forEach(function(step, i) {
            step.hidden = i !== index;
        });

        progressItems.forEach(function(item, i) {
            item.classList.toggle("is-active", i === index);
        });
    }

    function revokeRecordingAgreement() {
        if (agreeCheck) {
            agreeCheck.checked = false;
            handleAgreeChange();
            agreeCheck.focus();
        }

        trainingFlow.hidden = true;
    }

    if (startButton && agreeCheck && recordingDialog) {
        startButton.addEventListener("click", function() {
            if (!agreeCheck.checked) return;
            recordingDialog.showModal();
        });
    }

    if (recordingCancel && recordingDialog) {
        recordingCancel.addEventListener("click", function() {
            recordingDialog.close();
            revokeRecordingAgreement();
        });
    }

    if (recordingDialog) {
        recordingDialog.addEventListener("cancel", function() {
            revokeRecordingAgreement();
        });
    }

    if (recordingConfirm && recordingDialog && titleInput) {
        recordingConfirm.addEventListener("click", function() {
            if (!agreeCheck || !agreeCheck.checked) return;

            recordingDialog.close();
            showStep(0);
            trainingFlow.hidden = false;
            trainingFlow.scrollIntoView({ behavior: "smooth" });
            titleInput.focus();
        });
    }

    function validateTitle() {
        if (!titleInput || !titleError) return false;

        const value = titleInput.value.trim();

        if (!value) {
            titleError.textContent = "발표 제목을 입력해 주세요.";
            titleInput.classList.add("has-error");
            titleInput.focus();
            return false;
        }

        titleError.textContent = "";
        titleInput.classList.remove("has-error");
        formData.title = value;
        return true;
    }

    if (titleNext) {
        titleNext.addEventListener("click", function() {
            if (validateTitle()) showStep(1);
        });
    }

    function updateDuration() {
        if (!durationRange || !durationValue) return;

        const index = Number(durationRange.value);
        durationValue.value = durationValues[index] + "분";
    }

    if (durationRange) {
        durationRange.addEventListener("input", updateDuration);
        updateDuration();
    }

    if (qnaOption && qnaOptions) {
        qnaOption.addEventListener("change", function() {
            qnaOptions.hidden = !qnaOption.checked;
        });
    }

    if (optionPrev) {
        optionPrev.addEventListener("click", function() {
            showStep(0);
        });
    }

    if (optionNext) {
        optionNext.addEventListener("click", function() {
            if (!durationRange || !qnaOption ||
                !summaryTitle || !summaryDuration || !summaryQna) return;

            formData.duration = durationValues[Number(durationRange.value)];
            formData.qna = qnaOption.checked;

            const count = document.querySelector(
                'input[name="qna-count"]:checked'
            );

            formData.qnaCount = count ? count.value : "2";

            summaryTitle.textContent = formData.title;
            summaryDuration.textContent = formData.duration + "분";
            summaryQna.textContent = formData.qna
                ? formData.qnaCount + "개 포함"
                : "미포함";

            showStep(2);
        });
    }

    if (summaryPrev) {
        summaryPrev.addEventListener("click", function() {
            showStep(1);
        });
    }

    if (finishButton) {
        finishButton.addEventListener("click", function() {
            showStep(3);
        });
    }

    if (restartButton) {
        restartButton.addEventListener("click", function() {
            formData.title = "";
            formData.duration = "5";
            formData.qna = false;
            formData.qnaCount = "2";

            if (titleInput) titleInput.value = "";

            if (titleError) titleError.textContent = "";

            if (titleInput) {
                titleInput.classList.remove("has-error");
            }

            if (durationRange) durationRange.value = "1";
            updateDuration();

            if (qnaOption) qnaOption.checked = false;
            if (qnaOptions) qnaOptions.hidden = true;

            const defaultCount = document.querySelector(
                'input[name="qna-count"][value="2"]'
            );

            if (defaultCount) defaultCount.checked = true;

            if (summaryTitle) summaryTitle.textContent = "";
            if (summaryDuration) summaryDuration.textContent = "";
            if (summaryQna) summaryQna.textContent = "";

            showStep(0);
            trainingFlow.hidden = true;
        });
    }
}
