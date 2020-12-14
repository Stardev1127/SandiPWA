import I18nComponent from '../component/I18n';

/** Ensure full application remount on locale change */
const render = (args, callback) => {
    return (
        <I18nComponent>
            { callback(...args) }
        </I18nComponent>
    )
}

export default {
    'Component/App/Component': {
        'member-function': {
            render
        }
    }
};
