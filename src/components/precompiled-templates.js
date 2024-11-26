(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['AdCard.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        return '                <div class=\'housing-card__circle\'></div>\r\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'housing-card\' id=\''
    + alias4(((helper = (helper = lookupProperty(helpers,'elementId') || (depth0 != null ? lookupProperty(depth0,'elementId') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'elementId','hash':{},'data':data,'loc':{'start':{'line':1,'column':30},'end':{'line':1,'column':43}}}) : helper)))
    + '\'>\r\n    <!-- ID is used for js not styles -->\r\n    <div class=\'housing-card__main-img-container\'>\r\n        <img\r\n            class=\'housing-card__main-img js-main-img\'\r\n            src=\''
    + alias4(((helper = (helper = lookupProperty(helpers,'currentImagePath') || (depth0 != null ? lookupProperty(depth0,'currentImagePath') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'currentImagePath','hash':{},'data':data,'loc':{'start':{'line':6,'column':17},'end':{'line':6,'column':37}}}) : helper)))
    + '\'\r\n            alt=\'Housing card image\'\r\n        />\r\n        <div class=\'housing-card__image-pagination-div js-pagination-div\'>\r\n            <!-- Здесь будут кружочки -->\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,(depth0 != null ? lookupProperty(depth0,'images') : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':11,'column':12},'end':{'line':13,'column':21}}})) != null ? stack1 : '')
    + '            <!--        <div class="circle-empty"></div>-->\r\n        </div>\r\n    </div>\r\n\r\n    <button class=\'housing-card__like-button js-like-button\'>\r\n        <svg\r\n            width=\'43\'\r\n            height=\'43\'\r\n            viewBox=\'0 0 43 43\'\r\n            fill=\'none\'\r\n            xmlns=\'http://www.w3.org/2000/svg\'\r\n        >\r\n            <g style=\'mix-blend-mode:multiply\' filter=\'url(#filter0_d_181_2)\'>\r\n                <circle cx=\'21.5\' cy=\'17.5\' r=\'17.5\' fill=\'#9D9999\' />\r\n            </g>\r\n            <path\r\n                fill-rule=\'evenodd\'\r\n                clip-rule=\'evenodd\'\r\n                d=\'M22 13.0001C20.5005 11.2526 17.9948 10.7126 16.116 12.3128C14.2372 13.913 13.9727 16.5884 15.4481 18.481C16.6749 20.0545 20.3873 23.3732 21.6041 24.4474C21.7402 24.5676 21.8082 24.6276 21.8877 24.6512C21.9569 24.6718 22.0327 24.6718 22.1021 24.6512C22.1815 24.6276 22.2495 24.5676 22.3857 24.4474C23.6024 23.3732 27.3148 20.0545 28.5416 18.481C30.017 16.5884 29.7848 13.8961 27.8737 12.3128C25.9626 10.7294 23.4995 11.2526 22 13.0001Z\'\r\n                stroke=\'white\'\r\n                stroke-width=\'2\'\r\n                stroke-linecap=\'round\'\r\n                stroke-linejoin=\'round\'\r\n            />\r\n            <defs>\r\n                <filter\r\n                    id=\'filter0_d_181_2\'\r\n                    x=\'0\'\r\n                    y=\'0\'\r\n                    width=\'43\'\r\n                    height=\'43\'\r\n                    filterUnits=\'userSpaceOnUse\'\r\n                    color-interpolation-filters=\'sRGB\'\r\n                >\r\n                    <feFlood flood-opacity=\'0\' result=\'BackgroundImageFix\' />\r\n                    <feColorMatrix\r\n                        in=\'SourceAlpha\'\r\n                        type=\'matrix\'\r\n                        values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\'\r\n                        result=\'hardAlpha\'\r\n                    />\r\n                    <feOffset dy=\'4\' />\r\n                    <feGaussianBlur stdDeviation=\'2\' />\r\n                    <feComposite in2=\'hardAlpha\' operator=\'out\' />\r\n                    <feColorMatrix\r\n                        type=\'matrix\'\r\n                        values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\'\r\n                    />\r\n                    <feBlend\r\n                        mode=\'normal\'\r\n                        in2=\'BackgroundImageFix\'\r\n                        result=\'effect1_dropShadow_181_2\'\r\n                    />\r\n                    <feBlend\r\n                        mode=\'normal\'\r\n                        in=\'SourceGraphic\'\r\n                        in2=\'effect1_dropShadow_181_2\'\r\n                        result=\'shape\'\r\n                    />\r\n                </filter>\r\n            </defs>\r\n        </svg>\r\n    </button>\r\n\r\n    <div class=\'housing-card__info\'>\r\n        <div class=\'housing-card__location\'>\r\n            <p class=\'housing-card__city\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'cityName') || (depth0 != null ? lookupProperty(depth0,'cityName') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'cityName','hash':{},'data':data,'loc':{'start':{'line':80,'column':42},'end':{'line':80,'column':54}}}) : helper)))
    + '</p>\r\n            <p class=\'housing-card__address\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'address') || (depth0 != null ? lookupProperty(depth0,'address') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'address','hash':{},'data':data,'loc':{'start':{'line':81,'column':45},'end':{'line':81,'column':56}}}) : helper)))
    + '</p>\r\n            <div class=\'housing-card__view-row\'>\r\n                <span class=\'housing-card__view\'>\r\n                    <img\r\n                        src=\'../../public/svg/eye.svg\'\r\n                        height=\'15\'\r\n                        width=\'15\'\r\n                    />\r\n                    <p class=\'housing-card__view__p\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'viewsCount') || (depth0 != null ? lookupProperty(depth0,'viewsCount') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'viewsCount','hash':{},'data':data,'loc':{'start':{'line':89,'column':53},'end':{'line':89,'column':67}}}) : helper)))
    + '</p>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\'housing-card__author-info\'>\r\n            <img\r\n                class=\'housing-card__avatar\'\r\n                src=\''
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'avatar') : stack1), depth0))
    + '\'\r\n                alt=\'User avatar\'\r\n            />\r\n            <p class=\'housing-card__author-name\'>'
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'name') : stack1), depth0))
    + '</p>\r\n            <div class=\'housing-card__rating-container\'>\r\n                <img class=\'housing-card__star\' src=\'/star.png\' alt=\'star\' />\r\n                <span class=\'housing-card__rating\'>'
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'rating') : stack1), depth0))
    + '</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';
    },'useData':true});
    templates['AdListPage.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '        <div class=\'ad-list-page__upper-container\'>\n            <h1 class=\'ad-list-page__title\'>Список объявлений</h1>\n            <button class=\'ad-list-page__add-button js-add-btn\'>Добавить\n                объявление</button>\n        </div>\n        <div class=\'ad-list-page__adverts-container js-advert-list\'>\n'
    + ((stack1 = lookupProperty(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'empty') : depth0),{'name':'if','hash':{},'fn':container.program(2, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':9,'column':12},'end':{'line':11,'column':19}}})) != null ? stack1 : '')
    + '        </div>\n';
    },'2':function(container,depth0,helpers,partials,data) {
        return '                <p class=\'ad-list-page__no-adverts-text\'>Здесь пока пусто... 🕳️</p>\n';
    },'4':function(container,depth0,helpers,partials,data) {
        return '        <p class=\'ad-list-page__not-host-message\'>🚫Вы не являетесь хостом,\n            поэтому не можете создавать объявления.</p>\n        <p class=\'ad-list-page__not-host-message\'>Если вы хотите стать хостом,\n            пожалуйста, измените свой статус в настройках</p>\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'ad-list-page\'>\n'
    + ((stack1 = lookupProperty(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'isHost') : depth0),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.program(4, data, 0),'data':data,'loc':{'start':{'line':2,'column':4},'end':{'line':18,'column':11}}})) != null ? stack1 : '')
    + '</div>';
    },'useData':true});
    templates['AdPage.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                    <li class=\'ad-page__gallery__carousel__img-container\'>\r\n                        <img\r\n                            class=\'ad-page__gallery__carousel__img-background\'\r\n                            src=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'path') : depth0), depth0))
    + '\'\r\n                        />\r\n                        <img\r\n                            class=\'ad-page__gallery__carousel__img\'\r\n                            src=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'path') : depth0), depth0))
    + '\'\r\n                        />\r\n                    </li>\r\n';
    },'3':function(container,depth0,helpers,partials,data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                    <img\r\n                        class=\'ad-page__gallery__secondary-img js-carousel-img\'\r\n                        src=\''
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,'path') : depth0), depth0))
    + '\'\r\n                    />\r\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'ad-page\' id=\''
    + alias4(((helper = (helper = lookupProperty(helpers,'elementId') || (depth0 != null ? lookupProperty(depth0,'elementId') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'elementId','hash':{},'data':data,'loc':{'start':{'line':1,'column':25},'end':{'line':1,'column':38}}}) : helper)))
    + '\'>\r\n    <main>\r\n        <div class=\'ad-page__gallery\'>\r\n            <ul class=\'ad-page__gallery__carousel js-main-img-div\'>\r\n                <div class=\'ad-page__gallery__carousel__buttons-container\'>\r\n                    <button\r\n                        class=\'ad-page__gallery__carousel__prev-image-button js-prev-image-button js-carousel-overlay-button\'\r\n                    ><svg\r\n                            aria-hidden=\'true\'\r\n                            width=\'16\'\r\n                            height=\'16\'\r\n                            viewBox=\'0 0 16 16\'\r\n                            fill=\'none\'\r\n                            xmlns=\'http://www.w3.org/2000/svg\'\r\n                        ><path\r\n                                fill-rule=\'evenodd\'\r\n                                clip-rule=\'evenodd\'\r\n                                d=\'M3 8.003 10.707.296l1.414 1.414-6.293 6.293 6.293 6.293-1.414 1.414L3 8.003Z\'\r\n                                fill=\'currentColor\'\r\n                            ></path></svg>\r\n                    </button>\r\n                    <button\r\n                        class=\'ad-page__gallery__carousel__next-image-button js-next-image-button js-carousel-overlay-button\'\r\n                    >\r\n                        <svg\r\n                            class=\'a10a3f92e9--container--izJBY a10a3f92e9--display_block--ERcB0 a10a3f92e9--color_white_100--B2e13\'\r\n                            aria-hidden=\'true\'\r\n                            width=\'16\'\r\n                            height=\'16\'\r\n                            viewBox=\'0 0 16 16\'\r\n                            fill=\'none\'\r\n                            xmlns=\'http://www.w3.org/2000/svg\'\r\n                        ><path\r\n                                fill-rule=\'evenodd\'\r\n                                clip-rule=\'evenodd\'\r\n                                d=\'M13.414 8 5.707.293 4.293 1.707 10.586 8l-6.293 6.293 1.414 1.414L13.414 8Z\'\r\n                                fill=\'currentColor\'\r\n                            ></path></svg>\r\n                    </button>\r\n                </div>\r\n\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,(depth0 != null ? lookupProperty(depth0,'images') : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':42,'column':16},'end':{'line':53,'column':25}}})) != null ? stack1 : '')
    + '            </ul>\r\n            <div class=\'ad-page__gallery__carousel__secondary-images\'>\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,(depth0 != null ? lookupProperty(depth0,'images') : depth0),{'name':'each','hash':{},'fn':container.program(3, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':56,'column':16},'end':{'line':61,'column':25}}})) != null ? stack1 : '')
    + '            </div>\r\n        </div>\r\n\r\n        <div class=\'advert-apps\'>\r\n            <div class=\'advert-apps__element\'>\r\n                <div class=\'advert-apps__photo-container\'>\r\n                    <img src=\'/svg/eye-greybg.svg\' width=\'40\' height=\'40\' />\r\n                </div>\r\n                <div class=\'advert-apps__info\'>\r\n                    <p class=\'advert-apps__info__p1\'>Просмотрено</p>\r\n                    <p class=\'advert-apps__info__p2\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'viewsCount') || (depth0 != null ? lookupProperty(depth0,'viewsCount') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'viewsCount','hash':{},'data':data,'loc':{'start':{'line':72,'column':53},'end':{'line':72,'column':67}}}) : helper)))
    + ' раз</p>\r\n                </div>\r\n            </div>\r\n            <div class=\'advert-apps__element\'>\r\n                <div class=\'advert-apps__photo-container\'>\r\n                    <img src=\'/svg/favorites-grey.svg\' width=\'40\' height=\'40\' />\r\n                </div>\r\n                <div class=\'advert-apps__info\'>\r\n                    <p class=\'advert-apps__info__p1\'>Понравилось</p>\r\n                    <p class=\'advert-apps__info__p2\'>5 раз</p>\r\n                </div>\r\n            </div>\r\n            <div class=\'advert-apps__element\'>\r\n                <div class=\'advert-apps__photo-container\'>\r\n                    <img\r\n                        src=\'/svg/person-walking.svg\'\r\n                        alt=\'Количество просмотров объявления\'\r\n                        width=\'40\'\r\n                        height=\'40\'\r\n                    />\r\n                </div>\r\n                <div class=\'advert-apps__info\'>\r\n                    <p class=\'advert-apps__info__p1\'>Посещено</p>\r\n                    <p class=\'advert-apps__info__p2\'>3 раз</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\'advert-desc\'>\r\n            <div class=\'advert-desc__text-data\'>\r\n                <span class=\'advert-desc__label\'>Город:</span>\r\n                <span class=\'advert-desc__value\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'cityName') || (depth0 != null ? lookupProperty(depth0,'cityName') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'cityName','hash':{},'data':data,'loc':{'start':{'line':103,'column':49},'end':{'line':103,'column':61}}}) : helper)))
    + '</span>\r\n                <span class=\'advert-desc__label\'>Адрес:</span>\r\n                <span class=\'advert-desc__value\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'address') || (depth0 != null ? lookupProperty(depth0,'address') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'address','hash':{},'data':data,'loc':{'start':{'line':105,'column':49},'end':{'line':105,'column':60}}}) : helper)))
    + '</span>\r\n                <span class=\'advert-desc__label\'>Комнаты:</span>\r\n                <span class=\'advert-desc__value\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'roomsNumber') || (depth0 != null ? lookupProperty(depth0,'roomsNumber') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'roomsNumber','hash':{},'data':data,'loc':{'start':{'line':107,'column':49},'end':{'line':107,'column':64}}}) : helper)))
    + '</span>\r\n                <span class=\'advert-desc__label\'>Описание:</span>\r\n                <span class=\'advert-desc__value\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'description') || (depth0 != null ? lookupProperty(depth0,'description') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'description','hash':{},'data':data,'loc':{'start':{'line':109,'column':49},'end':{'line':109,'column':64}}}) : helper)))
    + '</span>\r\n            </div>\r\n        </div>\r\n    </main>\r\n\r\n    <div\r\n        class=\'ad-page__fullscreen-overlay ad-page__fullscreen-overlay_hidden js-fullscreen-overlay\'\r\n    >\r\n        <img\r\n            src=\''
    + alias4(((helper = (helper = lookupProperty(helpers,'currentImagePath') || (depth0 != null ? lookupProperty(depth0,'currentImagePath') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'currentImagePath','hash':{},'data':data,'loc':{'start':{'line':118,'column':17},'end':{'line':118,'column':37}}}) : helper)))
    + '\'\r\n            class=\'ad-page__fullscreen-overlay__image js-main-image-fullscreen\'\r\n        />\r\n    </div>\r\n\r\n    <aside class=\'ad-page-profile-container\'>\r\n        <a\r\n            href=\'/profiles?id='
    + alias4(((helper = (helper = lookupProperty(helpers,'authorUUID') || (depth0 != null ? lookupProperty(depth0,'authorUUID') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'authorUUID','hash':{},'data':data,'loc':{'start':{'line':125,'column':31},'end':{'line':125,'column':45}}}) : helper)))
    + '\'\r\n            class=\'ad-page-profile-container__center\'\r\n        >\r\n            <div class=\'ad-page-profile-container__photo\'>\r\n                <img\r\n                    src=\''
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'avatar') : stack1), depth0))
    + '\'\r\n                    class=\'ad-page-profile-container__photo__img1\'\r\n                />\r\n            </div>\r\n            <p class=\'ad-page-profile-container__p1\'>'
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'name') : stack1), depth0))
    + '</p>\r\n            <p\r\n                class=\'ad-page-profile-container__p2\'\r\n            >'
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'locationMain') : stack1), depth0))
    + '</p>\r\n            <hr class=\'ad-page-profile-container__hr\' />\r\n        </a>\r\n\r\n        <div class=\'ad-page-profile-container__div\'>\r\n            <div class=\'ad-page-profile-container__p\'>Рейтинг:</div>\r\n            <div class=\'ad-page-profile-container__info\'>\r\n                <span class=\'ad-page-profile-container__score-container\'>\r\n                    <img\r\n                        class=\'ad-page-profile-container__img2\'\r\n                        src=\'/star.png\'\r\n                        alt=\'star\'\r\n                    />\r\n                    <span\r\n                        class=\'ad-page-profile-container__score\'\r\n                    >'
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'rating') : stack1), depth0))
    + '</span>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\'ad-page-profile-container__div\'>\r\n            <div class=\'ad-page-profile-container__p\'>Пол:</div>\r\n            <p class=\'ad-page-profile-container__info\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'sex') || (depth0 != null ? lookupProperty(depth0,'sex') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'sex','hash':{},'data':data,'loc':{'start':{'line':158,'column':55},'end':{'line':158,'column':62}}}) : helper)))
    + '</p>\r\n        </div>\r\n        <div class=\'ad-page-profile-container__div\'>\r\n            <div class=\'ad-page-profile-container__p\'>Возраст:</div>\r\n            <p class=\'ad-page-profile-container__info\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'age') || (depth0 != null ? lookupProperty(depth0,'age') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'age','hash':{},'data':data,'loc':{'start':{'line':162,'column':55},'end':{'line':162,'column':62}}}) : helper)))
    + '</p>\r\n        </div>\r\n\r\n        <button class=\'ad-page-profile-container__write-msg-button\'>Напишите\r\n            '
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,'adAuthor') : depth0)) != null ? lookupProperty(stack1,'name') : stack1), depth0))
    + '\r\n            прямо сейчас\r\n        </button>\r\n\r\n        <a class=\'ad-page-profile-container__show-on-map-button\'>Показать на\r\n            карте</a>\r\n    </aside>\r\n</div>';
    },'useData':true});
    templates['AuthPopup.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var helper, alias1=container.escapeExpression, alias2=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                <div class=\'auth-modal__field-container\'>\n                    <input\n                        class=\'auth-modal__input\'\n                        name=\''
    + alias1(((helper = (helper = lookupProperty(helpers,'key') || (data && lookupProperty(data,'key'))) != null ? helper : container.hooks.helperMissing),(typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{'name':'key','hash':{},'data':data,'loc':{'start':{'line':18,'column':30},'end':{'line':18,'column':38}}}) : helper)))
    + '\'\n                        placeholder=\''
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,'placeholder') : depth0), depth0))
    + '\'\n                        type=\''
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,'type') : depth0), depth0))
    + '\'\n                        minlength=\''
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,'minLen') : depth0), depth0))
    + '\'\n                        maxlength=\''
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,'maxLen') : depth0), depth0))
    + '\'\n                        required=\''
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,'required') : depth0), depth0))
    + '\'\n                        data-validation-type=\''
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,'validationType') : depth0), depth0))
    + '\'\n                    />\n\n                    <p\n                        class=\'js-error-text auth-modal__error\'\n                        aria-live=\'polite\'\n                    >\n                        <!-- error text here -->\n                    </p>\n                </div>\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'overlay\'>\n    <form novalidate method=\'POST\' class=\'auth-modal\' id=\'auth-form\'>\n        <div class=\'close-cross\'>\n            <a>\n                <img src=\'/svg/cross.svg\' width=\'30\' />\n            </a>\n        </div>\n        <img class=\'auth-logo\' src=\'/name.png\' />\n\n        <div class=\'auth-message\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'authMessage') || (depth0 != null ? lookupProperty(depth0,'authMessage') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'authMessage','hash':{},'data':data,'loc':{'start':{'line':10,'column':34},'end':{'line':10,'column':49}}}) : helper)))
    + '</div>\n        <div class=\'auth-modal__failure-message none\'>Неправильный логин или\n            пароль!</div>\n        <div class=\'auth-modal__fields-container\'>\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,(depth0 != null ? lookupProperty(depth0,'inputs') : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':14,'column':12},'end':{'line':34,'column':21}}})) != null ? stack1 : '')
    + '\n        </div>\n        <button class=\'auth-modal__sign-in-button\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'buttonText') || (depth0 != null ? lookupProperty(depth0,'buttonText') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'buttonText','hash':{},'data':data,'loc':{'start':{'line':37,'column':51},'end':{'line':37,'column':65}}}) : helper)))
    + '</button>\n        <div class=\'have-account\'><p>'
    + alias4(((helper = (helper = lookupProperty(helpers,'bottomText') || (depth0 != null ? lookupProperty(depth0,'bottomText') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'bottomText','hash':{},'data':data,'loc':{'start':{'line':38,'column':37},'end':{'line':38,'column':51}}}) : helper)))
    + '</p>\n            <a class=\'bold auth-modal__a\'>'
    + alias4(((helper = (helper = lookupProperty(helpers,'bottomAText') || (depth0 != null ? lookupProperty(depth0,'bottomAText') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'bottomAText','hash':{},'data':data,'loc':{'start':{'line':39,'column':42},'end':{'line':39,'column':57}}}) : helper)))
    + '</a>\n        </div>\n    </form>\n</div>';
    },'useData':true});
    templates['CityPhoto.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class="city-information">\n    <div class="city-information__center">\n        <img src="'
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'photo') : depth0), depth0))
    + '" class="city-information__image">\n        <h1 class="city-information__name">'
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'name') : depth0), depth0))
    + '</h1>\n    </div>\n\n    <div class="city-information__description">\n        '
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'description') : depth0), depth0))
    + '\n    </div>\n</div>';
    },'useData':true});
    templates['EditAdvertPage.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                <label for=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'name') : depth0), depth0))
    + '\'>'
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'label') : depth0), depth0))
    + '</label>\r\n'
    + ((stack1 = lookupProperty(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'isTextArea') : depth0),{'name':'if','hash':{},'fn':container.program(2, data, 0),'inverse':container.program(4, data, 0),'data':data,'loc':{'start':{'line':39,'column':16},'end':{'line':77,'column':23}}})) != null ? stack1 : '');
    },'2':function(container,depth0,helpers,partials,data) {
        var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                    <textarea\r\n                        class=\'edit-ad-page__edit-form__text-area\'\r\n                        rows=\'10\'\r\n                        name=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'name') : depth0), depth0))
    + '\'\r\n                        required\r\n                        minlength=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'minLen') : depth0), depth0))
    + '\'\r\n                    >'
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'value') : depth0), depth0))
    + '</textarea>\r\n';
    },'4':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return ((stack1 = lookupProperty(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'isSelect') : depth0),{'name':'if','hash':{},'fn':container.program(5, data, 0),'inverse':container.program(9, data, 0),'data':data,'loc':{'start':{'line':47,'column':16},'end':{'line':77,'column':16}}})) != null ? stack1 : '');
    },'5':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                    <select\r\n                        name=\''
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,'name') : depth0), depth0))
    + '\'\r\n                        class=\'js-cities edit-ad-page__edit-form__select\'\r\n                    >\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'options') : depth0),{'name':'each','hash':{},'fn':container.program(6, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':52,'column':24},'end':{'line':59,'column':33}}})) != null ? stack1 : '')
    + '                    </select>\r\n\r\n';
    },'6':function(container,depth0,helpers,partials,data) {
        var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                            <option\r\n                                value=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'name') : depth0), depth0))
    + '\'\r\n'
    + ((stack1 = lookupProperty(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'selected') : depth0),{'name':'if','hash':{},'fn':container.program(7, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':55,'column':32},'end':{'line':57,'column':39}}})) != null ? stack1 : '')
    + '                            >'
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'value') : depth0), depth0))
    + '</option>\r\n';
    },'7':function(container,depth0,helpers,partials,data) {
        return '                                selected=\'selected\'\r\n';
    },'9':function(container,depth0,helpers,partials,data) {
        var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '                    <input\r\n                        class=\'edit-ad-page__edit-form__input\'\r\n                        name=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'name') : depth0), depth0))
    + '\'\r\n                        placeholder=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'placeholder') : depth0), depth0))
    + '\'\r\n                        type=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'type') : depth0), depth0))
    + '\'\r\n                        minlength=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'minLen') : depth0), depth0))
    + '\'\r\n                        maxlength=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'maxLen') : depth0), depth0))
    + '\'\r\n                        min=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'min') : depth0), depth0))
    + '\'\r\n                        max=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'max') : depth0), depth0))
    + '\'\r\n                        value=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'value') : depth0), depth0))
    + '\'\r\n                        required\r\n                    />\r\n                ';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'edit-ad-page\'>\r\n    <main>\r\n        <div class=\'edit-advert-images-carousel\'>\r\n            <div class=\'edit-advert-images-carousel__main-img-div js-main-img-div\'>\r\n                <img src="/placeholder-image.avif" class=\'edit-advert-images-carousel__img-background\' />\r\n                <img src="/placeholder-image.avif" class=\'edit-advert-images-carousel__main-img\' />\r\n            </div>\r\n            <div\r\n                class=\'edit-advert-images-carousel__secondary-images js-secondary-images-container\'\r\n            >\r\n                <input type=\'file\' hidden class=\'js-file-input\' />\r\n                <svg\r\n                    class=\'edit-advert-images-carousel__secondary-img js-add-img-btn\'\r\n                    width=\'82\'\r\n                    height=\'82\'\r\n                    viewBox=\'0 0 82 82\'\r\n                    fill=\'none\'\r\n                    xmlns=\'http://www.w3.org/2000/svg\'\r\n                >\r\n                    <rect\r\n                        x=\'0.5\'\r\n                        y=\'0.5\'\r\n                        width=\'81\'\r\n                        height=\'81\'\r\n                        rx=\'9.5\'\r\n                        stroke=\'black\'\r\n                    />\r\n                    <path\r\n                        d=\'M40 42H34V40H40V34H42V40H48V42H42V48H40V42Z\'\r\n                        fill=\'#1D1B20\'\r\n                    />\r\n                </svg>\r\n            </div>\r\n        </div>\r\n\r\n        <form class=\'edit-ad-page__edit-form js-form\'>\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,(depth0 != null ? lookupProperty(depth0,'inputs') : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':37,'column':12},'end':{'line':78,'column':21}}})) != null ? stack1 : '')
    + '            <button class=\'edit-ad-page__btn\'>'
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,'actionButtonTitle') || (depth0 != null ? lookupProperty(depth0,'actionButtonTitle') : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === 'function' ? helper.call(alias1,{'name':'actionButtonTitle','hash':{},'data':data,'loc':{'start':{'line':79,'column':46},'end':{'line':79,'column':67}}}) : helper)))
    + '</button>\r\n        </form>\r\n    </main>\r\n\r\n    <div\r\n        class=\'edit-ad-page__fullscreen-overlay edit-ad-page__fullscreen-overlay_hidden js-fullscreen-overlay\'\r\n    >\r\n        <img\r\n            class=\'edit-ad-page__fullscreen-overlay__image js-main-image-fullscreen\'\r\n        />\r\n    </div>\r\n\r\n</div>';
    },'useData':true});
    templates['SecondaryImage.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'edit-advert-images-carousel__seconday-img-container\'>\r\n    <span\r\n        class=\'edit-advert-images-carousel__del-img-btn js-del-img-button\'\r\n        id=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'id') : depth0), depth0))
    + '\'\r\n        data-name=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'name') : depth0), depth0))
    + '\'\r\n    >x</span>\r\n    <img\r\n        class=\'edit-advert-images-carousel__secondary-img js-carousel-img\'\r\n        src=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'path') : depth0), depth0))
    + '\'\r\n    />\r\n</div>';
    },'useData':true});
    templates['Filter.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '      <div class="filter-element">\r\n        <input type="radio" id="geo-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':6,'column':36},'end':{'line':6,'column':46}}}) : helper)))
    + '" name="geo" value="'
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,'value') : depth0), depth0))
    + '" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias1,(depth0 != null ? lookupProperty(depth0,'isDefault') : depth0),{'name':'if','hash':{},'fn':container.program(2, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':6,'column':82},'end':{'line':6,'column':118}}})) != null ? stack1 : '')
    + '/>\r\n        <label for="geo-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':7,'column':24},'end':{'line':7,'column':34}}}) : helper)))
    + '">'
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,'text') : depth0), depth0))
    + '</label>\r\n      </div>\r\n';
    },'2':function(container,depth0,helpers,partials,data) {
        return 'checked';
    },'4':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '      <div class="filter-element">\r\n        <input type="checkbox" id="rating-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':15,'column':42},'end':{'line':15,'column':52}}}) : helper)))
    + '" name="rating" value="'
    + alias4(((helper = (helper = lookupProperty(helpers,'key') || (data && lookupProperty(data,'key'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'key','hash':{},'data':data,'loc':{'start':{'line':15,'column':75},'end':{'line':15,'column':83}}}) : helper)))
    + '" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias1,(depth0 != null ? lookupProperty(depth0,'isDefault') : depth0),{'name':'if','hash':{},'fn':container.program(2, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':15,'column':85},'end':{'line':15,'column':121}}})) != null ? stack1 : '')
    + '/>\r\n        <label for="rating-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':16,'column':27},'end':{'line':16,'column':37}}}) : helper)))
    + '">'
    + alias4(container.lambda((depth0 != null ? lookupProperty(depth0,'text') : depth0), depth0))
    + '</label>\r\n      </div>\r\n';
    },'6':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '      <div class="filter-element">\r\n        <input type="checkbox" id="new-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':24,'column':39},'end':{'line':24,'column':49}}}) : helper)))
    + '" name="new" value="'
    + alias4(((helper = (helper = lookupProperty(helpers,'key') || (data && lookupProperty(data,'key'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'key','hash':{},'data':data,'loc':{'start':{'line':24,'column':69},'end':{'line':24,'column':77}}}) : helper)))
    + '" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias1,(depth0 != null ? lookupProperty(depth0,'isDefault') : depth0),{'name':'if','hash':{},'fn':container.program(2, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':24,'column':79},'end':{'line':24,'column':115}}})) != null ? stack1 : '')
    + '/>\r\n        <label for="new-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':25,'column':24},'end':{'line':25,'column':34}}}) : helper)))
    + '">'
    + alias4(container.lambda((depth0 != null ? lookupProperty(depth0,'text') : depth0), depth0))
    + '</label>\r\n      </div>\r\n';
    },'8':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '      <div class="filter-element">\r\n        <input type="radio" id="sex-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':34,'column':36},'end':{'line':34,'column':46}}}) : helper)))
    + '" name="sex" value="'
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,'value') : depth0), depth0))
    + '" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias1,(depth0 != null ? lookupProperty(depth0,'isDefault') : depth0),{'name':'if','hash':{},'fn':container.program(2, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':34,'column':82},'end':{'line':34,'column':118}}})) != null ? stack1 : '')
    + '/>\r\n        <label for="sex-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':35,'column':24},'end':{'line':35,'column':34}}}) : helper)))
    + '">'
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,'text') : depth0), depth0))
    + '</label>\r\n      </div>\r\n';
    },'10':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '      <div class="filter-element">\r\n        <input type="radio" id="vis-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':44,'column':36},'end':{'line':44,'column':46}}}) : helper)))
    + '" name="vis" value="'
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,'value') : depth0), depth0))
    + '" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias1,(depth0 != null ? lookupProperty(depth0,'isDefault') : depth0),{'name':'if','hash':{},'fn':container.program(2, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':44,'column':82},'end':{'line':44,'column':118}}})) != null ? stack1 : '')
    + '/>\r\n        <label for="vis-'
    + alias4(((helper = (helper = lookupProperty(helpers,'index') || (data && lookupProperty(data,'index'))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':45,'column':24},'end':{'line':45,'column':34}}}) : helper)))
    + '">'
    + alias4(alias5((depth0 != null ? lookupProperty(depth0,'text') : depth0), depth0))
    + '</label>\r\n      </div>\r\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<form class="filter">\r\n  <div class="filter-group geoposition-group">\r\n    <p class="filter__group-name">По геопозиции</p>\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,'geoposition') : depth0)) != null ? lookupProperty(stack1,'variations') : stack1),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':4,'column':4},'end':{'line':9,'column':13}}})) != null ? stack1 : '')
    + '  </div>\r\n    <hr>\r\n  <div class="filter-group rating-group">\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,'rating') : depth0)) != null ? lookupProperty(stack1,'variations') : stack1),{'name':'each','hash':{},'fn':container.program(4, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':13,'column':4},'end':{'line':18,'column':13}}})) != null ? stack1 : '')
    + '  </div>\r\n    <hr>\r\n  <div class="filter-group new-group">\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,'new') : depth0)) != null ? lookupProperty(stack1,'variations') : stack1),{'name':'each','hash':{},'fn':container.program(6, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':22,'column':4},'end':{'line':27,'column':13}}})) != null ? stack1 : '')
    + '  </div>\r\n    <hr>\r\n  <div class="filter-group gender-group">\r\n    <p class="filter__group-name">Пол хоста</p>\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,'gender') : depth0)) != null ? lookupProperty(stack1,'variations') : stack1),{'name':'each','hash':{},'fn':container.program(8, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':32,'column':4},'end':{'line':37,'column':13}}})) != null ? stack1 : '')
    + '  </div>\r\n    <hr>\r\n  <div class="filter-group visitors-group">\r\n    <p class="filter__group-name">Количество гостей</p>\r\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,'visitors') : depth0)) != null ? lookupProperty(stack1,'variations') : stack1),{'name':'each','hash':{},'fn':container.program(10, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':42,'column':4},'end':{'line':47,'column':13}}})) != null ? stack1 : '')
    + '  </div>\r\n  \r\n  <button type="submit" class="apply-button">Применить</button>\r\n  <button type="reset" class="reset-button">Сбросить</button>\r\n</form>\r\n';
    },'useData':true});
    templates['HorizontalAdCard.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4='function', lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'horizontal-ad-card\'>\r\n    <img class=\'horizontal-ad-card__img\' src=\''
    + alias1(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,'image') : depth0)) != null ? lookupProperty(stack1,'path') : stack1), depth0))
    + '\' />\r\n\r\n    <div class=\'horizontal-ad-card__info\'>\r\n        <svg\r\n            class=\'horizontal-ad-card__notification-bell\'\r\n            viewBox=\'0 0 38 38\'\r\n            fill=\'none\'\r\n            xmlns=\'http://www.w3.org/2000/svg\'\r\n        >\r\n            <path\r\n                d=\'M21.7392 33.25C21.4608 33.7299 21.0613 34.1282 20.5805 34.4051C20.0998 34.682 19.5548 34.8277 19 34.8277C18.4452 34.8277 17.9002 34.682 17.4195 34.4051C16.9387 34.1282 16.5392 33.7299 16.2608 33.25M28.5 12.6667C28.5 10.1471 27.4991 7.73074 25.7175 5.94914C23.9359 4.16755 21.5196 3.16666 19 3.16666C16.4804 3.16666 14.0641 4.16755 12.2825 5.94914C10.5009 7.73074 9.5 10.1471 9.5 12.6667C9.5 23.75 4.75 26.9167 4.75 26.9167H33.25C33.25 26.9167 28.5 23.75 28.5 12.6667Z\'\r\n                stroke=\'#1E1E1E\'\r\n                stroke-width=\'4\'\r\n                stroke-linecap=\'round\'\r\n                stroke-linejoin=\'round\'\r\n            />\r\n        </svg>\r\n\r\n        <p class=\'horizontal-ad-card__city\'>'
    + alias1(((helper = (helper = lookupProperty(helpers,'cityName') || (depth0 != null ? lookupProperty(depth0,'cityName') : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{'name':'cityName','hash':{},'data':data,'loc':{'start':{'line':20,'column':44},'end':{'line':20,'column':56}}}) : helper)))
    + '</p>\r\n        <p class=\'horizontal-ad-card__address\'>'
    + alias1(((helper = (helper = lookupProperty(helpers,'address') || (depth0 != null ? lookupProperty(depth0,'address') : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{'name':'address','hash':{},'data':data,'loc':{'start':{'line':21,'column':47},'end':{'line':21,'column':58}}}) : helper)))
    + '</p>\r\n        <div class=\'horizontal-ad-card__buttons-container\'>\r\n            <button\r\n                class=\'horizontal-ad-card__open-btn js-open-btn\'\r\n            >Открыть</button>\r\n            <button\r\n                class=\'horizontal-ad-card__edit-btn js-edit-btn\'\r\n            >Редактировать</button>\r\n            <button\r\n                class=\'horizontal-ad-card__del-btn js-del-btn\'\r\n            >Удалить</button>\r\n        </div>\r\n    </div>\r\n</div>';
    },'useData':true});
    templates['PopupAlert.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'alert\'>\n    '
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,'message') || (depth0 != null ? lookupProperty(depth0,'message') : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{'name':'message','hash':{},'data':data,'loc':{'start':{'line':2,'column':4},'end':{'line':2,'column':15}}}) : helper)))
    + '\n</div>';
    },'useData':true});
    templates['EditForm.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        return 'checked';
    },'3':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return ' value="'
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'birthdate') : stack1), depth0))
    + '" ';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<form id="form" class="edit-form" enctype="multipart/form-data">\n    <div class="edit-form__close">\n        <img src="/svg/cross.svg" width="30px" height="30px" class="edit-form__close__cross js-close-cross">\n    </div>\n    <div class="edit-form__title">\n        <p class="edit-form__title__p1">Обновление профиля</p>\n    </div>\n    \n    <div class="edit-form__data">\n        <div class="edit-form__data__first-column">\n            <div class="edit-form__input-line">\n                <p class="edit-form__input-line__title">Никнейм:</p>\n                <input \n                    id="username"\n                    name="username"\n                    class="edit-form__input-line__input js-validate"\n                    type="text"\n                    value="'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'username') : stack1), depth0))
    + '"\n                    minlength="6"\n                    maxlength="20"\n                />\n                <a class="none edit-form__input-line__exclamation">\n                    <img src="/svg/exclamation.svg" width="20" alt="!">\n                </a>\n                <div class="edit-form__input-line__validationMessage none"></div>\n            </div>\n            <div class="edit-form__input-line">\n                <p class="edit-form__input-line__title">Имя:</p>\n                <input\n                    id="name"\n                    name="name"\n                    class="edit-form__input-line__input js-validate"\n                    type="text"\n                    value="'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'name') : stack1), depth0))
    + '"\n                    minlength="5"\n                    maxlength="50"\n                />\n                <a class="none edit-form__input-line__exclamation">\n                    <img src="/svg/exclamation.svg" width="20" alt="!">\n                </a>\n                <div class="edit-form__input-line__validationMessage none"></div>\n            </div>\n            <div class="edit-form__input-line">\n                <p class="edit-form__input-line__title">Почта:</p>\n                <input\n                    id="email"\n                    name="email"\n                    class="edit-form__input-line__input js-validate"\n                    type="email"\n                    value="'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'email') : stack1), depth0))
    + '"\n                    minlength="3"\n                    maxlength="40"\n                />\n                <a class="none edit-form__input-line__exclamation">\n                    <img src="/svg/exclamation.svg" width="20" alt="!">\n                </a>\n                <div class="edit-form__input-line__validationMessage none"></div>\n            </div>\n            <div class="edit-form__input-line">\n                <p class="edit-form__input-line__title">Пол:</p>\n                <div class="edit-form__sex">\n                    <span class="edit-form__sex__radio">\n                        <input id="sexNS" name="sex" type="radio" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,'sex') : depth0)) != null ? lookupProperty(stack1,'ns') : stack1),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':63,'column':66},'end':{'line':63,'column':94}}})) != null ? stack1 : '')
    + '>\n                        <span class="custom-radio"></span>\n                        <label for="sexNS">Не указано</label>\n                    </span>\n\n                    <span class="edit-form__sex__radio">\n                        <input id="sexM" name="sex" type="radio" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,'sex') : depth0)) != null ? lookupProperty(stack1,'male') : stack1),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':69,'column':65},'end':{'line':69,'column':95}}})) != null ? stack1 : '')
    + '>\n                        <span class="custom-radio"></span>\n                        <label for="sexM">Муж.</label>\n                    </span>\n                    \n                    <span class="edit-form__sex__radio">\n                        <input id="sexF" name="sex" type="radio" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,'sex') : depth0)) != null ? lookupProperty(stack1,'female') : stack1),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':75,'column':65},'end':{'line':75,'column':97}}})) != null ? stack1 : '')
    + '>\n                        <span class="custom-radio"></span>\n                        <label for="sexF">Жен.</label>\n                    </span>\n                </div>\n            </div>\n            <div class="edit-form__input-line">\n                <p class="edit-form__input-line__title">День рождения:</p>\n                <input\n                    id="birthdate"\n                    name="birthdate"\n                    class="edit-form__input-line__input js-validate"\n                    type="date"\n                    min="1900-01-01"\n                    '
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,(depth0 != null ? lookupProperty(depth0,'showBirthdate') : depth0),{'name':'if','hash':{},'fn':container.program(3, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':89,'column':20},'end':{'line':89,'column':76}}})) != null ? stack1 : '')
    + '\n                />\n                <a class="none edit-form__input-line__exclamation">\n                    <img src="/svg/exclamation.svg" width="20" alt="!">\n                </a>\n                <div class="edit-form__input-line__validationMessage none"></div>\n            </div>\n            <div class="edit-form__input-line">\n                <p class="edit-form__input-line__title">Хост:</p>\n                <label class="edit-form__toggle">\n                    <input id="isHost" name="isHost" class="edit-form__toggle__input" type="checkbox" '
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'isHost') : stack1),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':99,'column':102},'end':{'line':99,'column':135}}})) != null ? stack1 : '')
    + '>\n                    <span class="edit-form__toggle__slider round"></span>\n                </label>\n            </div>\n            <div class="edit-form__input-line">\n                <p class="edit-form__input-line__title">Адрес:</p>\n                <input \n                    id="address"\n                    name="address"\n                    class="edit-form__input-line__input"\n                    type="text"\n                    minlength="6"\n                    maxlength="20"\n                />\n                <a class="none edit-form__input-line__exclamation">\n                    <img src="/svg/exclamation.svg" width="20" alt="!">\n                </a>\n                <div class="edit-form__input-line__validationMessage none"></div>\n            </div>\n        </div>\n\n\n        <div class="edit-form__data__second-column">\n            <div class="edit-form__avatar__image-container">\n                <img src="'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'avatar') : stack1), depth0))
    + '" class="edit-form__avatar__image-container__image js-avatar-upload-image">\n            </div>\n            <div class="edit-form__avatar__file-upload-wrapper js-avatar-upload-wrapper" data-text="Select your file!">\n                <input id="avatar" name="avatar" type="file" class="edit-form__avatar__file-upload-wrapper__input" value="">\n            </div>\n\n            <div class="edit-form__buttons">\n                <button id="submit" type="submit" class="edit-form__buttons__submit-button">Обновить</button>\n                <button id="reset" type="reset" class="edit-form__buttons__reset-button js-reset-button">Сбросить</button>\n            </div>\n        </div>\n    </div>\n</form>';
    },'useData':true});
    templates['NoReviews.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        return '        <p>Отзывов пока нет.</p>\n';
    },'3':function(container,depth0,helpers,partials,data) {
        return '        <p>Отзывов пока нет. Станьте первым!</p>\n        <div class="no-reviews__button-container">\n            <button class="no-reviews__button">\n                Оценить\n            </button>\n        </div>\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class="no-reviews">\n    <div class="no-reviews__img-container">\n        <img src="/walking.webp">\n    </div>\n\n    <div class="no-reviews__content">\n'
    + ((stack1 = lookupProperty(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'isMyProfile') : depth0),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.program(3, data, 0),'data':data,'loc':{'start':{'line':7,'column':8},'end':{'line':16,'column':15}}})) != null ? stack1 : '')
    + '    </div>\n</div>';
    },'useData':true});
    templates['RatingForm.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        return '<div id="new-rate" class="new-rate">\n    <h1 class="new-rate__caption">Ваш отзыв</h1>\n    <form class="new-rate__form">\n        <h3 class="new-rate__overall-rate">Общая оценка</h3>\n        <fieldset class="new-rate__fieldset">\n            <span class="new-rate__stars">\n                <input type="radio" id="new-rate-5" name="rating" value="5" />\n                <label for="new-rate-5">5</label>\n                <input type="radio" id="new-rate-4" name="rating" value="4" />\n                <label for="new-rate-4">4</label>\n                <input type="radio" id="new-rate-3" name="rating" value="3" />\n                <label for="new-rate-3">3</label>\n                <input type="radio" id="new-rate-2" name="rating" value="2" />\n                <label for="new-rate-2">2</label>\n                <input type="radio" id="new-rate-1" name="rating" value="1" />\n                <label for="new-rate-1">1</label>\n            </span>\n        </fieldset>\n    </form>\n\n    <div class="new-rate__title-container">\n        <input id="review-title" type="text" placeholder="Заголовок" class="new-rate__title-container__title"/>\n    </div>\n\n    <div class="new-rate__review-container">\n        <textarea id="review-text" type="text" placeholder="Текст" class="new-rate__review-container__text"></textarea>\n    </div>\n\n    <div class="new-rate__button-container">\n        <button type="submit" class="new-rate__leave-review js-leave-review">Оставить отзыв</button>\n    </div>\n</div>\n';
    },'useData':true});
    templates['ProfileInfo.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '\n                    '
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'age') : stack1), depth0))
    + '\n                ';
    },'3':function(container,depth0,helpers,partials,data) {
        return 'Не указано';
    },'5':function(container,depth0,helpers,partials,data) {
        return 'Да';
    },'7':function(container,depth0,helpers,partials,data) {
        return 'Нет';
    },'9':function(container,depth0,helpers,partials,data) {
        return 'Изменить';
    },'11':function(container,depth0,helpers,partials,data) {
        return 'Оценить';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div id=\'profile\' class=\'profile-container\'>\n    <div class=\'profile-container__center\'>\n        <div class=\'profile-container__photo\'>\n            <img src=\''
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'avatar') : stack1), depth0))
    + '\' class=\'profile-container__photo__img1 js-profile-info-avatar\' />\n        </div>\n        <p class=\'profile-container__p1\'>'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'name') : stack1), depth0))
    + '</p>\n        <hr class=\'profile-container__hr\' />\n    </div>\n\n    <div class=\'justify-profile-content\'>\n        <div class=\'profile-container__div\'>\n            <div class=\'profile-container__p\'>Рейтинг:</div>\n            <div class=\'profile-container__info\'>\n                <span class=\'profile-container__score-container\'>\n                    <img\n                        class=\'profile-container__img2\'\n                        src=\'/star.png\'\n                        alt=\'star\'\n                    />\n                    <span class=\'profile-container__score\'>'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'score') : stack1), depth0))
    + '</span>\n                </span>\n                <a class="js-graphic-href">\n                    <img src="/svg/href-icon.svg">\n                </a>\n            </div>\n        </div>\n        <div class=\'profile-container__div\'>\n            <div class=\'profile-container__p\'>Пол:</div>\n            <p class=\'profile-container__info\'>'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'sex') : stack1), depth0))
    + '</p>\n        </div>\n        <div class=\'profile-container__div\'>\n            <div class=\'profile-container__p\'>Возраст:</div>\n            <p class=\'profile-container__info\'>'
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,(depth0 != null ? lookupProperty(depth0,'isCorrectAge') : depth0),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.program(3, data, 0),'data':data,'loc':{'start':{'line':33,'column':47},'end':{'line':35,'column':41}}})) != null ? stack1 : '')
    + '</p>\n        </div>\n        <div class=\'profile-container__div\'>\n            <div class=\'profile-container__p\'>Хост:</div>\n            <p class=\'profile-container__info\'>'
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'isHost') : stack1),{'name':'if','hash':{},'fn':container.program(5, data, 0),'inverse':container.program(7, data, 0),'data':data,'loc':{'start':{'line':39,'column':47},'end':{'line':41,'column':38}}})) != null ? stack1 : '')
    + '</p>\n        </div>\n        <div class=\'profile-container__div\'>\n            <div class=\'profile-container__p\'>Серферы:</div>\n            <p class=\'profile-container__info\'>'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'guestCount') : stack1), depth0))
    + '</p>\n        </div>\n    </div>\n\n    <div class=\'profile-container__edit-container\'>\n        <div class=\'profile-container__center\'>\n            <button\n                id=\'edit-button\'\n                class=\'profile-container__edit-button\'\n            >'
    + ((stack1 = lookupProperty(helpers,'if').call(alias3,(depth0 != null ? lookupProperty(depth0,'isMyProfile') : depth0),{'name':'if','hash':{},'fn':container.program(9, data, 0),'inverse':container.program(11, data, 0),'data':data,'loc':{'start':{'line':54,'column':13},'end':{'line':54,'column':62}}})) != null ? stack1 : '')
    + '</button>\n        </div>\n    </div>\n</div>';
    },'useData':true});
    templates['ProfilePopup.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var helper, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '            <div>\n                <a\n                    href=\''
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'href') : depth0), depth0))
    + '\'\n                    id=\''
    + alias2(((helper = (helper = lookupProperty(helpers,'key') || (data && lookupProperty(data,'key'))) != null ? helper : container.hooks.helperMissing),(typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{'name':'key','hash':{},'data':data,'loc':{'start':{'line':7,'column':24},'end':{'line':7,'column':32}}}) : helper)))
    + '\'\n                    class=\'profile-list__href\'\n                >\n                    '
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'title') : depth0), depth0))
    + '\n                </a>\n            </div>\n            <hr class=\'profile-list__underline\' />\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class=\'profile-overlay\'>\n    <div class=\'profile-list\'>\n'
    + ((stack1 = lookupProperty(helpers,'each').call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':3,'column':8},'end':{'line':14,'column':17}}})) != null ? stack1 : '')
    + '    </div>\n</div>';
    },'useData':true});
    templates['ReviewCard.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class="review" style="'
    + alias3((lookupProperty(helpers,'reviewBackground')||(depth0 && lookupProperty(depth0,'reviewBackground'))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,'rating') : depth0),{'name':'reviewBackground','hash':{},'data':data,'loc':{'start':{'line':1,'column':27},'end':{'line':1,'column':59}}}))
    + '">\n    <div class="review__main-container">\n        <div class="review__profile">\n            <div class="review__profile__img-container">\n                <img src="'
    + alias3(alias4((depth0 != null ? lookupProperty(depth0,'userAvatar') : depth0), depth0))
    + '" class="review__profile__img">\n            </div>\n            <h4 class="review__profile__name">'
    + alias3(alias4((depth0 != null ? lookupProperty(depth0,'userName') : depth0), depth0))
    + '</h4>\n        </div>\n\n        <div class="review__value">\n            <h2 class="review__title">'
    + alias3(alias4((depth0 != null ? lookupProperty(depth0,'title') : depth0), depth0))
    + '</h2>\n            <div class="review__text">\n                '
    + alias3(alias4((depth0 != null ? lookupProperty(depth0,'text') : depth0), depth0))
    + '\n            </div>\n        </div>\n    </div>\n\n    <div class="review__add-info">\n        <div class="review__add-info__stars">\n            '
    + alias3((lookupProperty(helpers,'renderStars')||(depth0 && lookupProperty(depth0,'renderStars'))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,'rating') : depth0),{'name':'renderStars','hash':{},'data':data,'loc':{'start':{'line':20,'column':12},'end':{'line':20,'column':39}}}))
    + '\n        </div>\n        <div class="review__add-info__data">\n            '
    + alias3(alias4((depth0 != null ? lookupProperty(depth0,'createdAt') : depth0), depth0))
    + '\n        </div>\n    </div>\n</div>';
    },'useData':true});
    templates['ReviewsGraphic.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class="graphic-page">\n    <canvas id="graphic" class="graphic-page__graphic">\n        Извините, ваш браузер не поддерживает &lt;canvas&gt; элемент.\n    </canvas>\n\n    <div class="graphic-page__info">\n        <span class="graphic-page__info__rating">Изменение рейтинга</span>\n        <span class="graphic-page__info__avg-rating">Изменение среднего рейтинга</span>\n    </div>\n\n    <div class="graphic-page__additional-info">\n        <p>Всего оценок: '
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'totalRatings') : depth0), depth0))
    + '</p>\n        <p>Дата первой оценки: '
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'firstDate') : depth0), depth0))
    + '</p>\n        <p>Дата последней оценки: '
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'lastDate') : depth0), depth0))
    + '</p>\n        <p>Наибольшая оценка: '
    + alias2((lookupProperty(helpers,'renderStars')||(depth0 && lookupProperty(depth0,'renderStars'))||alias4).call(alias3,(depth0 != null ? lookupProperty(depth0,'highestRating') : depth0),{'name':'renderStars','hash':{},'data':data,'loc':{'start':{'line':15,'column':30},'end':{'line':15,'column':64}}}))
    + '</p>\n        <p>Наименьшая оценка: '
    + alias2((lookupProperty(helpers,'renderStars')||(depth0 && lookupProperty(depth0,'renderStars'))||alias4).call(alias3,(depth0 != null ? lookupProperty(depth0,'lowestRating') : depth0),{'name':'renderStars','hash':{},'data':data,'loc':{'start':{'line':16,'column':30},'end':{'line':16,'column':63}}}))
    + '</p>\n    </div>\n</div>\n';
    },'useData':true});
    templates['SearchPopup.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
        var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '            <a id="'
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'entitle') : depth0), depth0))
    + '" class="search-popup__city">'
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,'title') : depth0), depth0))
    + '</a>\n';
    },'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class="search-popup__container js-search-popup">\n    <div class="search-popup__main">\n        <a id="'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'moscow') : depth0)) != null ? lookupProperty(stack1,'entitle') : stack1), depth0))
    + '" class="search-popup__city">'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'moscow') : depth0)) != null ? lookupProperty(stack1,'title') : stack1), depth0))
    + '</a>\n        <a id="'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'spb') : depth0)) != null ? lookupProperty(stack1,'entitle') : stack1), depth0))
    + '" class="search-popup__city">'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'spb') : depth0)) != null ? lookupProperty(stack1,'title') : stack1), depth0))
    + '</a>\n    </div>\n\n    <div class="search-popup__other">\n        <div class="search-popup__other__column">\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias3,(depth0 != null ? lookupProperty(depth0,'firstGroup') : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':9,'column':12},'end':{'line':11,'column':21}}})) != null ? stack1 : '')
    + '        </div>\n        <div class="search-popup__other__column">\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias3,(depth0 != null ? lookupProperty(depth0,'secondGroup') : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':14,'column':12},'end':{'line':16,'column':21}}})) != null ? stack1 : '')
    + '        </div>\n        <div class="search-popup__other__column">\n'
    + ((stack1 = lookupProperty(helpers,'each').call(alias3,(depth0 != null ? lookupProperty(depth0,'thirdGroup') : depth0),{'name':'each','hash':{},'fn':container.program(1, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':19,'column':12},'end':{'line':21,'column':21}}})) != null ? stack1 : '')
    + '        </div>\n    </div>\n</div>\n\n';
    },'useData':true});
    templates['ShortAdCard.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
        var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5='function', lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined;
        };

        return '<div class="short-card">\n    <div class="short-card__main-info">\n        <div class="short-card__img-container">\n            <img src="'
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'adAuthor') : stack1)) != null ? lookupProperty(stack1,'avatar') : stack1), depth0))
    + '" height="80" width="80">\n        </div>\n        <div class="short-card__name-container">\n            <p class="short-card__name-container__name">'
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'adAuthor') : stack1)) != null ? lookupProperty(stack1,'name') : stack1), depth0))
    + '</p>\n            <span class="short-card__rating-container">\n                <img src="/star.png" height="16" width="16">\n                <p class="short-card__rating-container__rating">'
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'adAuthor') : stack1)) != null ? lookupProperty(stack1,'rating') : stack1), depth0))
    + '</p>\n            </span>\n            <span class="short-card__location-container">\n                <img src="/svg/location.svg" width="18" height="18">\n                <p class="short-card__location-container__address">'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'cityName') : stack1), depth0))
    + '</p>\n            </span>\n        </div>\n    </div>\n\n    <span class="short-card__address-container">\n        <img src="../../public/svg/house.svg" height="20" width="20">\n        <p class="short-card__address-container__address">'
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'address') : stack1), depth0))
    + '</p>\n    </span>\n\n    <div class="short-card__description">\n        '
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'description') : stack1), depth0))
    + '\n    </div>\n\n    <div class="short-card__additional-info">\n        <div class="short-card__row">\n            <span class="short-card__row__title">Пол:</span>\n            <span class="short-card__row__value">'
    + alias2(((helper = (helper = lookupProperty(helpers,'sex') || (depth0 != null ? lookupProperty(depth0,'sex') : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{'name':'sex','hash':{},'data':data,'loc':{'start':{'line':31,'column':49},'end':{'line':31,'column':56}}}) : helper)))
    + '</span>\n        </div>\n        <div class="short-card__row">\n            <span class="short-card__row__title">Возраст:</span>\n            <span class="short-card__row__value">'
    + alias2(((helper = (helper = lookupProperty(helpers,'age') || (depth0 != null ? lookupProperty(depth0,'age') : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{'name':'age','hash':{},'data':data,'loc':{'start':{'line':35,'column':49},'end':{'line':35,'column':56}}}) : helper)))
    + '</span>\n        </div>\n        <div class="short-card__row">\n            <span class="short-card__row__title">Всего гостей:</span>\n            <span class="short-card__row__value">'
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,'data') : depth0)) != null ? lookupProperty(stack1,'adAuthor') : stack1)) != null ? lookupProperty(stack1,'guestCount') : stack1), depth0))
    + '</span>\n        </div>\n    </div>\n\n    <div class="short-card__button-container">\n        <button class="short-card__more-button js-more-ads" data-index="'
    + alias2(((helper = (helper = lookupProperty(helpers,'index') || (depth0 != null ? lookupProperty(depth0,'index') : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':44,'column':72},'end':{'line':44,'column':81}}}) : helper)))
    + '">Подробнее</button>\n        <button class="short-card__chat-button js-new-chat" data-index="'
    + alias2(((helper = (helper = lookupProperty(helpers,'index') || (depth0 != null ? lookupProperty(depth0,'index') : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{'name':'index','hash':{},'data':data,'loc':{'start':{'line':45,'column':72},'end':{'line':45,'column':81}}}) : helper)))
    + '">Напиши мне!</button>\n    </div>\n</div>';
    },'useData':true});
})();