async function openTemplate(name) {

    const response = await fetch(
        `templates/${name}.txt`
    );


    if (!response.ok) {

        return "TEMPLATE NOT FOUND";

    }


    return await response.text();

}
