const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = $("#result");
const sound = $("#sound");
const btn = $("#search-btn");

$(document).keyup((e) => {
  if (e.keyCode === 13) {
    btn.click();
  }
});

btn.click(() => {
  let inpWord = $("#inp-word").val();
  if (inpWord !== "") {
    $.get({
      url: url + inpWord,
      dataType: "json",
    })
      .done((data) => {
        result.html(
          `
          <div class="word">
            <h3>${data[0].word}</h3>
            <button onclick="playSound()"><i class="fas fa-volume-up"></i></button>
          </div>
          <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
          </div>
          <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
          </p>
          `
        );
        sound.attr("src", `https:${data[0].phonetics[0].audio}`);
      })
      .fail(() => {
        result.html(`<h3 class="error">Couldn't Find The Word</h3>`);
      });
  } else {
    result.html(`<h3 class="error">Couldn't Find The Word</h3>`);
  }
});

var playSound = () => {
  sound.trigger("play");
};
