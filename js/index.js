document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form")

    form.addEventListener("submit", e => {
        e.preventDefault()
        const searchName = e.target["search"].value
        searchUserNames(searchName)
    })
})

function searchUserNames(searchName) {
    fetch (`https://api.github.com/search/users?q=${searchName}`)
    .then(res => res.json())
    .then(userData => {
        const userInfo = userData.items
        for (const user of userInfo) {
            let userCard = document.createElement("li")
            userCard.id = `${user.id}`
            userCard.className = "user-info"
            userCard.innerHTML = `
                <img src=${user.avatar_url}>
                <h3>${user.login}</h3>
                <a href=${user.url}>${user.url}</a>
            `
            userCard.querySelector("img").addEventListener("click", () => {
                selectUser(userCard)
            })
            document.getElementById("user-list").appendChild(userCard)
        }
    })
}

function selectUser(userCard) {
    const listOfUsers = document.getElementsByClassName("user-info")
                
    for (const user of listOfUsers) {
        const userID = document.getElementById(`${user.id}`).id
        if (userID === userCard.id) {
            user.style.display = "block"
            getUserRepos(user)
        } else {
            user.style.display = "none"
        }
    }
}

function getUserRepos(user){
    const selectedUserName = user.querySelector("h3").textContent
   
    fetch(`https://api.github.com/users/${selectedUserName}/repos`)
    .then(res=>res.json())
    .then(userRepos => {
        for (const repo of userRepos){
            let repoCard = document.createElement("li")
            repoCard.innerHTML = `
                <a href=${repo.html_url}>${repo.name}</a>
            `
            document.getElementById("repos-list").appendChild(repoCard)
        }
        
    })
}