function selectOption(button){

    const buttons=document.querySelectorAll(".card button");

    buttons.forEach(btn=>btn.classList.remove("selected"));

    button.classList.add("selected");

    }
}