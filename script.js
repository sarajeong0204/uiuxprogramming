
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
            titleError.textContent = "상담 신청하실 내용을 입력해 주세요.";
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


/* 포트폴리오 보관함 기능 */


/* 포트폴리오 보관함 기능 */

const saveButtons = document.querySelectorAll(".save-portfolio");
const savedPortfolioList = document.querySelector("#saved-portfolio-list");
const savedMessage = document.querySelector("#saved-message");

const STORAGE_KEY = "sarajeong-saved-portfolios";

const portfolioData = {
    house: {
        title: "주거공간 디자인",
        description: "편안하고 따뜻한 분위기의 주거공간",
        image: "assets/images/serviceimage.png",
        tabId: "tab-house"
    },
    office: {
        title: "상업공간 디자인",
        description: "브랜드의 개성을 살린 상업공간",
        image: "assets/images/serviceimage2.png",
        tabId: "tab-office"
    },
    decor: {
        title: "실내 데코 디자인",
        description: "소품과 색상으로 완성하는 공간 스타일링",
        image: "assets/images/serviceimage3.png",
        tabId: "tab-decor"
    }
};

/* 저장된 목록 불러오기 */
function loadSavedPortfolios() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) return [];

        const parsedData = JSON.parse(savedData);

        if (!Array.isArray(parsedData)) return [];

        return [...new Set(parsedData)].filter(function(id) {
            return Object.prototype.hasOwnProperty.call(
                portfolioData,
                id
            );
        });
    } catch (error) {
        return [];
    }
}

let savedPortfolios = loadSavedPortfolios();

/* 저장 목록을 브라우저에 기록하기 */
function persistSavedPortfolios() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(savedPortfolios)
        );
        return true;
    } catch (error) {
        return false;
    }
}

/* 저장 버튼 상태 업데이트 */
function updateSaveButtons() {
    saveButtons.forEach(function(button) {
        const id = button.dataset.saveId;
        const isSaved = savedPortfolios.includes(id);

        button.textContent = isSaved
            ? "보관함에서 삭제"
            : "보관함에 저장";

        button.setAttribute(
            "aria-pressed",
            String(isSaved)
        );
    });
}

/* 보관함 화면 표시 */
function renderSavedPortfolios() {
    if (!savedPortfolioList || !savedMessage) return;

    savedPortfolioList.innerHTML = "";

    if (savedPortfolios.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent =
            "아직 저장한 포트폴리오가 없습니다.";

        savedPortfolioList.appendChild(emptyMessage);
        updateSaveButtons();
        return;
    }

    savedPortfolios.forEach(function(id) {
        const portfolio = portfolioData[id];

        if (!portfolio) return;

        const card = document.createElement("article");
        card.classList.add("saved-portfolio-card");

        const image = document.createElement("img");
        image.src = portfolio.image;
        image.alt = portfolio.title;

        const title = document.createElement("h3");
        title.textContent = portfolio.title;

        const description = document.createElement("p");
        description.textContent = portfolio.description;

        const actions = document.createElement("div");
        actions.classList.add("saved-actions");

        /* 다시 보기 버튼 */
        const openButton = document.createElement("button");
        openButton.type = "button";
        openButton.textContent = "다시 보기";

        openButton.addEventListener("click", function() {
            const targetTab = document.querySelector(
                "#" + portfolio.tabId
            );

            if (targetTab) {
                targetTab.click();

                document.querySelector("#features").scrollIntoView({
                    behavior: "smooth"
                });

                savedMessage.textContent =
                    portfolio.title + " 포트폴리오를 열었습니다.";
            }
        });

        /* 보관함에서 삭제 버튼 */
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "보관함에서 삭제";

        removeButton.addEventListener("click", function() {
            savedPortfolios = savedPortfolios.filter(function(savedId) {
                return savedId !== id;
            });

            const savedSuccessfully = persistSavedPortfolios();

            renderSavedPortfolios();

            savedMessage.textContent = savedSuccessfully
                ? portfolio.title + " 포트폴리오를 삭제했습니다."
                : "삭제했지만 브라우저에 변경 사항을 저장하지 못했습니다.";
        });

        actions.appendChild(openButton);
        actions.appendChild(removeButton);

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(actions);

        savedPortfolioList.appendChild(card);
    });

    updateSaveButtons();
}

/* 사진 저장 버튼 */
saveButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const id = button.dataset.saveId;
        const portfolio = portfolioData[id];

        if (!portfolio || !savedMessage) return;

        /* 이미 저장된 사진이면 삭제 */
        if (savedPortfolios.includes(id)) {
            savedPortfolios = savedPortfolios.filter(function(savedId) {
                return savedId !== id;
            });

            const savedSuccessfully = persistSavedPortfolios();

            renderSavedPortfolios();

            savedMessage.textContent = savedSuccessfully
                ? portfolio.title + " 포트폴리오를 삭제했습니다."
                : "삭제했지만 브라우저에 변경 사항을 저장하지 못했습니다.";

            return;
        }

        /* 보관함에 사진 추가 */
        savedPortfolios.push(id);

        const savedSuccessfully = persistSavedPortfolios();

        renderSavedPortfolios();

        savedMessage.textContent = savedSuccessfully
            ? portfolio.title + " 포트폴리오를 저장했습니다."
            : "현재 화면에는 저장했지만 브라우저에 기록하지 못했습니다.";
    });
});

/* 페이지를 열 때 저장 목록 표시 */
renderSavedPortfolios();
