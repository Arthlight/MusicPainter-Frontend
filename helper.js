
function checkForError(query) {
    if (query === undefined) {
        return false
    }
    return query['error'] === 'access_denied';

}




module.exports = {
    checkForError,
};