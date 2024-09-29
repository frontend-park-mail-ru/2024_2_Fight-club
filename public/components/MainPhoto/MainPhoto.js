'use strict'

class MainPhoto {
    constructor() {
        this.mainPhotoContainer = document.createElement('div')
        this.mainPhotoContainer.classList.add('photo-container')

        this.render()
    }

    render() {
        const hostsHrefs = document.createElement('div')
        const findHost = document.createElement('a')
        const beHost = document.createElement('a')
        const searchCityForm = document.createElement('form')
        const searchButtonDiv = document.createElement('div')
        const search = document.createElement('input')
        const findButton = document.createElement('button')

        findHost.text = 'Найти хоста'
        beHost.text = 'Стать хостом'
        findHost.href = '#'
        beHost.href = '#'
        searchCityForm.action = '#'
        search.placeholder = 'Search location'

        searchButtonDiv.classList.add('custom-search')
        hostsHrefs.classList.add('hosts')
        searchCityForm.classList.add('search-container')

        hostsHrefs.appendChild(findHost)
        hostsHrefs.appendChild(beHost)
        this.mainPhotoContainer.appendChild(hostsHrefs)

        searchButtonDiv.appendChild(search)
        searchButtonDiv.appendChild(findButton)
        searchCityForm.appendChild(searchButtonDiv)
        this.mainPhotoContainer.appendChild(searchCityForm)
    }

    getMainPhoto() {
        return this.mainPhotoContainer
    }
}

export default MainPhoto
