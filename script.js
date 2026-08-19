const nameInput = document.getElementById("nameInput");
const searchBtn = document.getElementById("searchBtn");

const resultSection = document.getElementById("resultSection");

const resultName = document.getElementById("resultName");
const resultMeaning = document.getElementById("resultMeaning");
const resultPersonality = document.getElementById("resultPersonality");
const resultBackground = document.getElementById("resultBackground");
const resultMessage = document.getElementById("resultMessage");

const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");


function cleanName(name) {

  return name
    .trim()
    .replace(/\s+/g, " ");

}


function searchName() {

  const enteredName = cleanName(nameInput.value);

  if (!enteredName) {

    alert("براہِ کرم اپنا نام لکھیں۔");

    nameInput.focus();

    return;
  }


  let data = nameData[enteredName];


  if (!data) {

    data = defaultData;

  }


  resultName.textContent = enteredName;

  resultMeaning.textContent = data.meaning;

  resultPersonality.textContent = data.personality;

  resultBackground.textContent = data.background;

  resultMessage.textContent = data.message;


  resultSection.classList.remove("hidden");


  setTimeout(() => {

    resultSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 100);

}


searchBtn.addEventListener("click", searchName);


nameInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {

    searchName();

  }

});


/* DOWNLOAD IMAGE */

async function downloadCard() {

  const card = document.getElementById("destinyCard");

  if (!card) {
    return;
  }


  try {

    const canvas = await html2canvas(card, {

      scale: 2,

      backgroundColor: "#ffffff",

      useCORS: true

    });


    const image = canvas.toDataURL("image/png");


    const link = document.createElement("a");


    const name =
      cleanName(nameInput.value) || "Name";


    link.download =
      `${name}-Rizwan-Name-Destiny.png`;


    link.href = image;


    link.click();


  } catch (error) {

    console.error(error);

    alert("تصویر بنانے میں مسئلہ آیا۔ دوبارہ کوشش کریں۔");

  }

}


downloadBtn.addEventListener("click", downloadCard);


/* SHARE */

async function shareResult() {

  const name =
    cleanName(nameInput.value);


  const shareText =
    `✨ ${name} کا Name Destiny دیکھیں!\n\n` +
    `Rizwan Name Destiny پر اپنا نام چیک کریں۔`;


  const shareUrl =
    window.location.href;


  if (navigator.share) {

    try {

      await navigator.share({

        title: "Rizwan Name Destiny",

        text: shareText,

        url: shareUrl

      });

    } catch (error) {

      console.log("Share cancelled.");

    }

  } else {

    try {

      await navigator.clipboard.writeText(

        shareText + "\n" + shareUrl

      );


      alert(
        "Share text اور link copy ہو گیا ہے۔"
      );


    } catch (error) {

      alert(
        "Share نہیں ہو سکا۔"
      );

    }

  }

}


shareBtn.addEventListener(
  "click",
  shareResult
);
