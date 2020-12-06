function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200){
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時:${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
    list.insertAdjacentHTML("afterend", HTML);
    formText.value = "";
    // 上記１行のコードによりメモの入力フォームに入力されたままの文字はリセットされる
    // 正確には、空の文字列に上書きされるような仕組み
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
