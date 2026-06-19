async function openTemplate(name) {

    const response = await fetch(
        `templates/${name}.txt`
    );


    if (!response.ok) {

        return "RECORD NOT FOUND";

    }


    return await response.text();

}
