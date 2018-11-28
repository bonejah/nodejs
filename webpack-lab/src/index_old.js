function generateComponent() {
    const element__ = document.createElement('DIV');
    element__.className = 'container';

    const paragraph = document.createElement('P');
    const txt = document.createTextNode('This is a tutorial envolving Webpack');

    paragraph.appendChild(txt);
    element__.appendChild(paragraph);

    console.log('My Javascript Log.');

    return element__;
}

document.body.appendChild(generateComponent())