let random = () => Math.floor(Math.random() * 12) + 1 ;
$( document ).ready(function() {
  let url = new URL(window.location.href);
  let section = url.searchParams.get("section") || '';
  let product = url.searchParams.get("product") || '';
  if(!product) {
    if(!section) {
      $.get( "data/menu.json", function( data ) {
        data.forEach(element => {
          $('section.tiles').append(`
          <article>
            <span class="image">
              <img src="images/pic`+('0'+random()).slice(-2)+`.jpg" alt="" />
            </span>
            <a href="index.html?section=${element.section}">
              <h2>${element.title}</h2>
              <div class="content">
                <p>${element.content}.</p>
              </div>
            </a>
          </article>`)
        });
      });
    } else {
      $.get( "data/section.json", function( data ) {
        if(data[section]) {
          (data[section] || []).forEach((element,index) => {
            $('section.tiles').append(`
            <article>
              <span class="image">
                <img src="images/${section}/${element.img}" alt="" />
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
    $.get( "data/section.json", function( data ) {
      if(data[section] && data[section][product]) {
        let product_data = data[section][product];
          $('#main div.inner > h1').text(product_data.title);
          $('section.content').append(`
          <p>
            <span class="image left"><img src="images/${section}/${product_data.img}" alt="" /></span>${product_data.content}.</p>
          `)
      } else window.location.href = "index.html"
    });
  }
});