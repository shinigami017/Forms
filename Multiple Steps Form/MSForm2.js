// MultiStep Form with Vanilla JS for animation and validation in Bootstrap 4.

document.addEventListener("DOMContentLoaded", () => {
    let myForm = document.querySelector("#stepped"),
        steps = document.querySelectorAll(".steps"),
        btnNext = document.querySelector("#btnNext"),
        btnPrev = document.querySelector("#btnPrev"),
        indicators = document.querySelectorAll(".rounded-circle"),
        currentTab = 0;
    // we'll need 4 different methods for this
    showTab(currentTab);

    function showTab(n) {
        steps[n].classList.add("active");
        if (n == 0) {
            btnPrev.classList.add("hidden");
        } else {
            btnPrev.classList.add("show");
        }
        if (n == (steps.length - 1)) {
            btnNext.textContent = "Submit";
        } else {
            btnNext.textContent = "Next"
        }
        showIndicators(n);
    }

    function showIndicators(n) {
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.replace("bg-warning", "bg-success");
        }
        indicators[n].className += " bg-warning";
    }

    function clickerBtn(n) {
        if (n == 1 && !validateForm()) return false;
        steps[currentTab].classList.remove("active");
        currentTab += n;
        if (currentTab >= steps.length) {
            myForm.submit();
            return false;
        }
        showTab(currentTab);
    }

    function validateForm() {
        let input = steps[currentTab].querySelectorAll(".form-control"),
            valid = true;;
        for (let i = 0; i < input.length; i++) {
            if (input[i].value == "") {
                if (!input[i].classList.contains("invalid")) {
                    input[i].classList.add("invalid");
                }
                valid = false;
            } else {
                if (input[i].classList.contains("invalid")) {
                    input[i].classList.remove("invalid");
                }
            }
        }
        return valid;
    }
    btnPrev.addEventListener("click", () => { clickerBtn(-1) });
    btnNext.addEventListener("click", () => { clickerBtn(1) });
});