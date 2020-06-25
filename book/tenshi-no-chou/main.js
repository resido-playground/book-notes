const bookTitle = "天使の蝶";
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
            let title = book.title;
            if (title != bookTitle) {
                return;
            }
            let author = book.author;
            let isbn = book.isbn;
            let dateRead = book.date_read;
            let score = book.score;
            let description = book.description;
            let img = book.image;
            let folder = book.folder;
            let note = book.note;

            let titleAuthor = title + '-' + author +'(著)';

            // タイトル更新
            let t = document.querySelector('title');
            t.insertAdjacentHTML('afterbegin', titleAuthor);
            //t.innerText = titleAuthor;

            // ヘッダ更新
            let h = '<figure>'
                + '<img src="' + ghHome + '/book-notes/image/天使の蝶.jpg" alt="'
                + titleAuthor + '">'
                + '</figure>'
                + '<h1>' + titleAuthor + '</h1>'
                + '<small>'
                + 'ISBN: ' + isbn + '<br>'
                + '読み終えた日: ' + dateRead + '<br>'
                + 'おすすめ度: <strong>10</strong>/10' + '<br>'
                + '<strong>(私がこれまでに読んだ本については'
                + ' <a href="' + ghHome + '/book-notes">こちら</a>'
                + 'をご覧ください。)</strong>'
                + '</small>'

            let headerSection = document.querySelector('header');
            headerSection.insertAdjacentHTML('afterbegin', h);

            // 概要更新
            let descSection = document.querySelector('#description');
            descSection.insertAdjacentHTML('afterbegin', description);

            // 本文更新
            let ps = note.replace(/  /g, "</span><span>");
            ps = '<span>' + ps + '</span>';
            let noteSection = document.querySelector('#note');
            noteSection.insertAdjacentHTML('afterbegin', ps);
        });
    });
});