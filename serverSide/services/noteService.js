/**
 * @param           {noteModule}
 * @description     importing the note module from the noteModule.js
 */
const noteModule = require('../app/modules/noteModule');

/**
 * @function          addNote
 * 
 * @description     this service used to call the module
 */
exports.addNote = (data, callback) => {

    //calling the addNotes Module
    noteModule.addNotes(data, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result);
        }
        else {
            callback(null, result)
        }
    })
}

/**
 * @function         noteArchive
 * 
 * @description      this function is used to call the noteArchine module
 */
exports.noteArchive = (data, callback) => {
    //calling the note Module to archive 
    noteModule.noteArchive(data, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result)
        }
        else {
            console.log(result);
            callback(null, result)
        }
    })
}

/**
 * @function        noteDelete
 * 
 * @description     this is used to delete the note
 */
exports.noteDelete = (data, callback) => {
    //calling the delete note module
    noteModule.noteDelete(data, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result)
        }
        else {
            console.log(result);
            callback(null, result)
        }
    })
}

/**
 * @function        getAllNotes
 * 
 * @description     this service is used to get All the notes  
 */
exports.getAllNotes = (data, callback) => {
    //calling the getAllNotes module
    noteModule.getAllNotes(data, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result)
        }
        else {
            console.log(result);
            callback(null, result)
        }
    })
}

/**
 * @function        restore
 * 
 * @description     this service is used to restore the deleted note
 */
exports.restore = (data, callback) => {
    //calling the restore  module
    noteModule.restore(data, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result);
        }
        else {
            callback(null, result)
        }
    })
}

/**
 * @function        noteReminder
 * 
 * @description     this service is used to set note Reminder
 */
exports.noteReminder = (data, callback) => {

    //calling noteReminder module
    noteModule.noteReminder(data, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result);

        }
        else {
            callback(null, result);
        }
    })
}
/**
 * @function         searchNoteByTitle
 * 
 * @description      this is used to search note by title
 */
exports.searchNoteByTitle=(data,callback)=>{

    //calling the searchNoteByTitle service

    noteModule.searchNoteByTitle(data,(err,result)=>{
        // if any error in the module
        if(err){
        callback(err,result);
        }
        else{
            callback(null,result);
        }
    })
}

/**
 * @function         searchNoteByDescription
 * 
 * @description      this is used to search note by title
 */
exports.searchNoteByDescription=(data,callback)=>{

    //calling the searchNoteByTitle service

    noteModule.searchNoteByDescription(data,(err,result)=>{
        // if any error in the module
        if(err){
        callback(err,result);
        }
        //if no error present sucessful callback
        else{
            callback(null,result);
        }
    })
}