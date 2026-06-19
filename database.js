/* ===== DATABASE TEMPLATE ENGINE ===== */


async function openTemplate(template, values) {

    const response = await fetch(
        `templates/${template}.txt`
    );


    if (!response.ok) {

        return "TEMPLATE NOT FOUND";

    }


    let content = await response.text();


    for (const key in values) {

        content = content.replaceAll(
            `{{${key}}}`,
            values[key]
        );

    }


    return content;

}
