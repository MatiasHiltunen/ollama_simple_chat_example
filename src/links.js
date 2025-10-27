
function createLink(fi, en, url) {

    return {
        name: {fi, en},
        url
    }

}


export const pageLinks = [
    "Palvelut",
    createLink("Brändäys", "Branding", "#brand"),
    createLink("Design", "Design", "#design"),
    createLink("Markkinointi", "Marketing", "#marketing"),
]

export const externalLinks = [
    "Muut linkit",
    createLink("Google", "Google", "https://google.com"),
    createLink("GitHub", "GitHub", "https://github.com"),
    createLink("Azure DevOps", "Azure DevOps", "https://dev.azure.com"),
]