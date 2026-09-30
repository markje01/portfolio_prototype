// HENTER HTML

const sceneImage = document.querySelector("#sceneImage");
const textBox = document.querySelector("#textBox");
const buttonBox = document.querySelector("#buttonBox");


// SCENER

const scenes = {
    intro: {
        image: "img/scene-intro.png",
        text: "Hey you! You are stressed and overworked. The deadline for your huge study assignment is getting closer, and your motivation is disappearing. You need a break!",
        buttons: [
            {
                text: "Start procrastinating now! I deserve a break.",
                next: "popup"
            }
        ]
    },

    popup: {
        image: "img/scene-popup.png",
        text: "You are browsing online during your hard-earned break. A pop-up appears and promises something that might help you feel better.",
        buttons: [
            {
                text: "Click pop-up. I like fish.",
                next: "landing"
            },
            {
                text: "Close it. I hate pop-ups.",
                next: "neutral"
            }
        ]
    },

    landing: {
        image: "img/scene-landing.png",
        text: "Phil's website looks friendly and harmless. It promises a plugin to replace negative words with positive ones while you browse. The page is full of cheerful claims, dubvious trust signals and a big download buttons.",
        buttons: [
            {
                text: "Check more info about Phil. I am curious.",
                next: "about"
            },
            {
                text: "Press download now - Come on, its free!",
                next: "download"
            },
            {
                text: "Close site/browser.",
                next: "good"
            }
        ]
    },

    about: {
        image: "img/scene-about.png",
        text: "You see a page with positive reviews, statistics and vague information about Phil's features. It looks convincing, but the claims are not properly explained or documented.",
        buttons: [
            {
                text: "This seems suspicious. Stop and leave.",
                next: "good"
            },
            {
                text: "Continue to download.",
                next: "download"
            },
            {
                text: "Close site/browser.",
                next: "good"
            }
        ]
    },

    download: {
        image: "img/scene-download.png",
        text: "Before installing, Phil asks for access to browser content, downloads, notifications, settings and personal data. That is a lot of access for a small positivity fish.",
        buttons: [
            
            {
                text: "Decline access. I do not like when apps do this.",
                next: "good"
            },
            {
                text: "Install Phil. This will help me relax while working.",
                next: "bad"
            },
            {
                text: "Close site/browser.",
                next: "good"
            }
        ]
    },

    neutral: {
        image: "img/scene-neutral.png",
        text: "Maybe you were sceptical, or maybe you were simply not interested. You might have missed a stress-relieving tool, or you might have dodged a bullet. Nothing happened, but you did not investigate the warning signs either.",
        theme: "neutral",
        buttons: [
            {
                text: "Try again.",
                next: "intro"
            }
        ]
    },

    good: {
        image: "img/scene-good.png",
        text: "You noticed that the site seemed vague, exaggerated and too good to be true. A goofy fish should not need access to your browser data. You made the safer choice by stopping before installing it.",
        theme: "good",
        buttons: [
            {
                text: "Try again. I can do worse.",
                next: "intro"
            }
        ]
    },

    bad: {
        image: "img/scene-bad.png",
        text: "You fell for it. Phil was not a fish, but a phish. By installing it, you accepted unnecessary permissions and may have exposed your personal information, data and money.",
        theme: "bad",
        buttons: [
            {
                text: "No way. I can do better. Try again.",
                next: "intro"
            }
        ]
    }
};


// FUNKTION SCENE

function showScene(sceneName) {
    const scene = scenes[sceneName];

    document.body.className = "";

    if (scene.theme) {
        document.body.classList.add(scene.theme);
    }

    sceneImage.src = scene.image;
    textBox.textContent = scene.text;

    buttonBox.innerHTML = "";

    scene.buttons.forEach(function(buttonInfo) {
        const button = document.createElement("button");

        button.textContent = buttonInfo.text;

        button.addEventListener("click", function() {
            showScene(buttonInfo.next);
        });

        buttonBox.appendChild(button);
    });
}


// STARTER SIDEN

showScene("intro");