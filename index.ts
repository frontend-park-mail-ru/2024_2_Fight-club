'use strict'

import Header from './components/Header/Header'
import AuthPopup from './components/AuthPopup/AuthPopup'
import MainPage from './components/MainPage/MainPage'
import Ajax from './modules/Ajax'

import { BACKEND_URL } from './modules/Consts'

const root = document.getElementById('root')!
const pageContainer = document.createElement('div')

/** Объект с коллбеками для header`а */
const headerCallbacks = {
    mainPage: renderMainPage,
    mapPage: renderMapPage,
    articlesPage: renderArticlesPage,
    messagesPage: renderMessagesPage,
    favoritesPage: renderFavoritesPage,
    notificationsPage: renderNotificationsPage,
    signInPage: renderSignInPage,
}

function renderMainPage() {
    const mainPage = new MainPage(pageContainer)
    mainPage.render()
}

function renderMapPage() {}

function renderArticlesPage() {}

function renderMessagesPage() {}

function renderFavoritesPage() {}

function renderNotificationsPage() {}

function renderSignInPage() {
    const auth = new AuthPopup()
    auth.render(root)
}

/** Главная функция */
const main = async () => {
    const response = await Ajax.get(BACKEND_URL + '/getSessionData')
    let isAuthorized = false
    if (response.ok) {
        isAuthorized = true
        const sessionInfo = await response.json()
    } else if (response.status !== 401) {
        console.error('Wrong response from server', response)
    }

    const header = new Header(headerCallbacks, isAuthorized)
    root.appendChild(header.getMainContainer())

    pageContainer.classList.add('page-container')
    root.appendChild(pageContainer)

    renderMainPage()
}

main()
