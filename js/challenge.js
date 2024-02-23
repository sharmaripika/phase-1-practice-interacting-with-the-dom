"use strict";

function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (var b = 0, c = Array(a.length); b < a.length; b++) {
            c[b] = a[b];
        }
        return c;
    }
    return Array.from(a);
}

var playing = true;

function timer() {
    return setInterval(function() {
        var counter = document.getElementById("counter");
        var count = parseInt(counter.innerText);
        counter.innerText = count + 1;
    }, 1000);
}

var interval = timer(),
    minus = document.getElementById("minus"),
    plus = document.getElementById("plus"),
    heart = document.getElementById("heart"),
    pause = document.getElementById("pause"),
    commentForm = document.getElementsByTagName("form")[0];

minus.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerText);
    counter.innerText = count - 1;
});

plus.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerText);
    counter.innerText = count + 1;
});

heart.addEventListener("click", function() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerText);
    var likesContainer = document.querySelector(".likes");
    var existingLike = void 0;

    if ([].concat(_toConsumableArray(likesContainer.children)).map(function(like) {
            return parseInt(like.dataset.num);
        }).includes(count)) {
        existingLike = document.querySelector('[data-num="' + count + '"]');
        var likeCount = parseInt(existingLike.children[0].innerText);
        existingLike.innerHTML = count + " has been liked <span>" + (likeCount + 1) + "</span> times";
    } else {
        existingLike = document.createElement("li");
        existingLike.setAttribute("data-num", count);
        existingLike.innerHTML = count + " has been liked <span>1</span> time";
        likesContainer.appendChild(existingLike);
    }
});

pause.addEventListener("click", function() {
    if (playing) {
        playing = false;
        clearInterval(interval);
        this.innerText = "resume";
    } else {
        playing = true;
        interval = timer();
        this.innerText = "pause";
    }

    [].concat(_toConsumableArray(document.getElementsByTagName("button"))).forEach(function(button) {
        if (button.id !== "pause") {
            button.disabled = !playing;
        }
    });
});

commentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var commentInput = this.children[0];
    var commentText = commentInput.value;
    commentInput.value = "";
    var commentsContainer = document.querySelector(".comments");
    var commentParagraph = document.createElement("p");
    commentParagraph.innerText = commentText;
    commentsContainer.appendChild(commentParagraph);
});
