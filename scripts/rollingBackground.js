document.addEventListener("DOMContentLoaded", () => {
    let index = 0;
    const images = [
        "images/img1.png",
        "images/img2.png",
        "images/img3.png",
        "images/img4.png",
        "images/img5.png",
    ];
    const hero = document.querySelector(".hero");
    const left = document.getElementById("leftSlider");
    const right = document.getElementById("rightSlider");
    hero.style.backgroundImage = `url(${images[index]})`;

    function moveLeft(){
        index = (index - 1) % images.length;
        if(index < 0) index = images.length-1
        hero.style.backgroundImage = `url(${images[index]})`;
    }

    function moveRight(){
        index = (index + 1) % images.length;
        hero.style.backgroundImage = `url(${images[index]})`;
    }

    left.addEventListener('click', ()=>{
        moveLeft();
    })
    right.addEventListener('click', ()=>{
        moveRight();
    })

    setInterval(() => {
    hero.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
    }, 6000);
});