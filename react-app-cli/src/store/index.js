const context = require['context']('./model', false, /\.js$/);
const getModel = context.keys().map((key) => context(key));

export function createStore(app) {
    getModel.forEach((model) => {
        app.model(model.default);
    })
}