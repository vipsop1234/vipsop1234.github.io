let random = () => Math.floor(Math.random() * 12) + 1;
$(document).ready(function () {
  let url = new URL(window.location.href);
  let section = url.searchParams.get("section") || '';
  let product = url.searchParams.get("product") || '';

  $.get("data/menu.json", function (data) {
    data.forEach(element => {
      $('#menu ul').append(`
      <li><a href="index.html?section=${element.section}">${element.title}</a></li>
      `)
    })
    if (!section) {
      data.forEach(element => {
        $('section.tiles').append(`
        <article>
          <span class="image">
            <img src="images/pic` + ('0' + random()).slice(-2) + `.jpg" alt="" />
          </span>
          <a href="index.html?section=${element.section}">
            <h2>${element.title}</h2>
            <div class="content">
              <p>${element.content}.</p>
            </div>
          </a>
        </article>`)
      });
    }
  });
  if (!product) {
    if (section) {
      $.get("data/section.json", function (data) {
        if (data[section]) {
          (data[section] || []).forEach((element, index) => {
            $('section.tiles').append(`
            <article>
              <span class="image">
                <img src="${element.img}" alt="" />
                <p>${element.price}</p>
              </span>
              <a href="product.html?section=${section}&product=${index}">
                <h2>${element.title}</h2>
                <div class="content">
                </div>
              </a>
            </article>`)
          });
        } else window.location.href = "index.html"
      });
    }
  } else {
    $.get("data/section.json", function (data) {
      if (data[section] && data[section][product]) {
        let product_data = data[section][product];
        $('#main div.inner > h1').text(product_data.title);
        $('section.content').append(`
          <p>
            <span class="image left"><img src="${product_data.img}" alt="" />
            <p>${product_data.price}</p></span>${product_data.content}.</p>
          `)
      } else window.location.href = "index.html"
    });
  }
});