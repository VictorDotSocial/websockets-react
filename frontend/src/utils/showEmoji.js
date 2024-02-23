function showEmoji(emojiInfo) {
  console.log("Llamando showEmoji", emojiInfo);
  const emojiContainer = document.querySelector("#emoji-container");
  const newEmoji = document.createElement("div");
  newEmoji.classList = "floating-emoji-container flex";
  newEmoji.style = `left: ${emojiInfo.horizontalPosition}vw`;
  newEmoji.innerHTML = `<div className="floating-emoji" style="font-size:${emojiInfo.emojiSize}vw">${emojiInfo.body}</div>`;

  emojiContainer.appendChild(newEmoji);

  setTimeout(() => {
    emojiContainer.removeChild(newEmoji);
  }, 3900);
}

export default showEmoji;
