const ghHome = "https://resido-playground.github.io";

function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', ghHome + '/book-notes/books.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

window.addEventListener('load', (event) => {
    loadJSON(function(response) {
        // Parse JSON string into object
        let books = JSON.parse(response);
        books.forEach(book => {
            let author = book.author;
            let title = book.title;
            let dateRead = book.date_read;
            let score = book.score;
            let description = book.description;
            let img = book.image;
            let folder = book.folder;

            let h = '<div class="abook">'
                + '<figure>'
                + '<a href="'
                + ghHome + '/book-notes/book/' + folder + '">'
                + '<img src="image/' + img + '" alt="'
                + title + '-' + author +'(著)">'
                + '</a>'
                + '</figure>'
                + '<h2>'
                + '<a href="'
                + ghHome + '/book-notes/book/' + folder + '">'
                + title + '-' + author +'(著)">'
                + '</a>'
                + '</h2>'
                + '<p>'
                + '<small>読んだ日: ' + dateRead
                + 'おすすめ度: <strong>' + score + '</strong>/10</small>'
                + '</p>'
                + '<p>'
                + description
                + '</p>'
                + '</div>';

            let bookSection = document.querySelector('#allbooks');
            bookSection.insertAdjacentHTML('afterend', h);
        });
    });
});