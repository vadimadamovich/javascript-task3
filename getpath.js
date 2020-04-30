function _getselector(e)
{
    let s = e.tagName.toLowerCase();

    if (e.id.length)
        s = `${s}#${e.id.toLowerCase()}`;

    for (let i = 0; i < e.classList.length; i++)
        s = `${s}.${e.classList[i].toLowerCase()}`;

    return s;
}

function _getuniqueselector(e)
{
    let count = 0;
    let index = 0;
    let unique = true;

    for (let i = 0; i < e.parentElement.childElementCount; i++)
    {
        // save current child
        _e = e.parentElement.children[i];

        // if there are more same tag names in children list then this child is not unique
        if (e !== _e && _getselector(e) === _getselector(_e))
            unique = false;

        // calculate count of children that have same tag name
        if (e.tagName.toLowerCase() === _e.tagName.toLowerCase())
            count++;

        // save current element index in the children list
        if (e === _e)
            index = count;

    }

    if (unique)
        return _getselector(e);

    if (index == 1)
        return _getselector(e) + ':first-child';

    if (index == count)
        return _getselector(e) + ':last-child';

    return _getselector(e) + `:nth-child(${index})`;
}

function getpath(e)
{
    let path = '';

    while (e.parentElement !== null)
    {
        path = String(`${_getuniqueselector(e)} ${path}`).trim();
        e = e.parentElement;
    }

    console.log(String(`${_getselector(e)} ${path}`).trim());
}

