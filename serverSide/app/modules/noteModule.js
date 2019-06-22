/**
 * @param           {mongoose}
 * @description      loading all the package to variable "mongoose"
 */
const mongoose = require('mongoose');

/**
 * making the fundoo to  mongoose.Schema
 */
const fundooNotes = mongoose.Schema({


    /**
     * @param       {email}
     * @description using the email to store the notes for a particular person
     */
    email: {
        type: String,
        required: [true, "email is required "]
    },
    /**
     * @param       {title}
     * 
     * @description title for any note is compulsary
     */
    title: {
        type: String,
        required: [true, "title is compulsary"]
    },
    /**
     * @param       {description}
     * 
     * @description   description of the note
     */
    description: {
        type: String,
        required: [true, "description is required"]
    },
    /**
     * @param           {isReminder}
     * 
     * @description setting this variable for setting the reminder 
     *              by default it is false
     */
    isReminder: {
        type: Boolean,
        default: false
    },
    /**
     * @param           {isDeleted}
     * 
     * @description     setting this variable to make the note deleted
     *                     by default it is false
     */
    isDeleted: {
        type: Boolean,
        default: false
    },
    /**
     * @param           {isArchive}
     * 
     * @description     setting this variable to make the note Archive
     *                  By default it is false
     *     
     */
    isArchive: {
        type: Boolean,
        default: false
    }

});
/**
 * @param          {notes}
 * @description     making note as collection in the fundoo database
 */
const note = mongoose.model("notes", fundooNotes);
/**
 * @function            getAllNotes
 * 
 * @description         getting all the notes of all the user based on email 
 */
exports.getAllNotes = (body, callback) => {
    note.find({ "email": body.email, "isDeleted": false }, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result)
        }
        else {
            if (result.length !== 0) {
                console.log(result);
                callback(null, result)
            }
            else {
                console.log("no notes are present");
                callback(null, "no notes are present")
            }

        }
    })
}

/**
 * @function            addNotes
 * 
 * @description         this is used to add the new notes in the database 
 *                      
 */
exports.addNotes = (body, callback) => {

    /**
     * finding the note with same title and email
     */
    note.findOne({ "email": body.email, "title": body.title, "isDeleted": false }, (err, result) => {
        if (err) {
            callback(err, result);

        }
        else {
            //
            console.log(result);

            if (result) {
                callback(null, "this title is already exists with this email");
            }

            //else add this note to data base
            else {
                const newNote = new note({
                    "email": body.email,
                    "title": body.title,
                    "description": body.description
                });
                //saving the note
                newNote.save((err, res) => {
                    if (err) {
                        console.log(err);
                        callback(err, res);
                    }
                    else {
                        console.log("note saved sucessfully");
                        callback(null, "note saved sucessfully");
                    }
                })
            }
        }
    })
}

/**
 * @function        noteArchive
 * 
 * @description     this function is used Archive the note
 */
exports.noteArchive = (body, callback) => {

    //finding the note to archive by email and title
    note.findOne({ "email": body.email, "title": body.title },
        (err, result) => {
            // if getting while updating
            if (err) {
                console.log(err);
                callback(err, result);
            }
            else {
                //is rresult is not empty
                if (result) {
                    //  console.log(result);
                    //is it is not archived it is false
                    if (result.isArchive === false) {
                        //upadte isArchiv to true
                        note.updateOne({ "email": result.email, "title": result.title }, { $set: { "isArchive": true } }, (error, res) => {
                            //any error while updating
                            if (error) {
                                //if error are while  updataing 
                                console.log(error);
                                callback(error, result)
                            }

                            else {
                                //note Archived sucessfully
                                console.log("Note Archived Sucessfully");
                                callback(null, "Note Archived Sucessfully");

                            }
                        })
                    }

                    else {
                        //if isArchive is already then it is updated 
                        console.log("failed to update to archive");
                        callback(null, "Already Note archive");
                    }
                }

                else {
                    //if email or title are invalid
                    callback(null, "email or title invalid");


                }
            }

        })

}

/**
 * @function        noteDelete
 * @description     this is the function to delete the note by making the isdelete the 
 *                  update to true
 */

exports.noteDelete = (body, callback) => {

    //finding the note to delete by email and title
    note.findOne({ "email": body.email, "title": body.title },
        (err, result) => {
            // if getting errors while deleting
            if (err) {
                console.log(err);
                callback(err, result);
            }
            else {
                //is rresult is not empty
                if (result) {
                    //  console.log(result);
                    //is it is not archived it is false
                    if (result.isDeleted === false) {
                        //upadte isArchiv to true
                        note.updateOne({ "email": result.email, "title": result.title }, { $set: { "isDeleted": true } }, (error, res) => {
                            //any error while updating
                            if (error) {
                                //if error are while  updataing 
                                console.log(error);
                                callback(error, result)
                            }

                            else {
                                //note Archived sucessfully
                                console.log("Note Deleted Sucessfully");
                                callback(null, "Note deleted Sucessfully");

                            }
                        })
                    }

                    else {
                        //if isArchive is already then it is updated 
                        console.log("failed to delete the note");
                        callback(null, "Already Note Deleted");
                    }
                }

                else {
                    //if email or title are invalid
                    callback(null, "email or title invalid");


                }
            }

        })

}
/**
 * @function        restore
 * 
 * @description     this function is used restore the deleted data
 */

exports.restore = (body, callback) => {


    note.findOne({ "email": body.email, "title": body.title }, (err, result) => {
        if (err) {
            console.log(err);
            callback(err, result);
        }
        else {
            // console.log(result);

            if (result) {
                note.updateOne({ "email": result.email }, { $set: { "isDeleted": false } }, (err, res) => {
                    if (err) {
                        console.log(err);
                        callback(err, result);
                    }
                    else {
                        console.log("updated sucessfully");
                        callback(null, "Restored Sucesfully");
                    }
                })
            }
            else {
                console.log("invalid email or title");
                callback(null, "invalid email or title");

            }
        }
    })
}
/**
* @function        noteReminder
* 
* @description     this function is used Archive the note
*/
exports.noteReminder = (body, callback) => {

    //finding the note to archive by email and title
    note.findOne({ "email": body.email, "title": body.title },
        (err, result) => {
            // if getting while updating
            if (err) {
                console.log(err);
                callback(err, result);
            }
            else {
                //is rresult is not empty
                if (result) {
                    //  console.log(result);
                    //is it is not archived it is false
                    if (result.isReminder === false) {
                        //upadte isArchiv to true
                        note.updateOne({ "email": result.email, "title": result.title }, { $set: { "isReminder": true } }, (error, res) => {
                            //any error while updating
                            if (error) {
                                //if error are while  updataing 
                                console.log(error);
                                callback(error, result)
                            }

                            else {
                                //note Archived sucessfully
                                console.log("Reminder added Sucessfully");
                                callback(null, "Reminder added Sucessfully");

                            }
                        })
                    }

                    else {
                        //if isArchive is already then it is updated 
                        console.log("failed to add Reminder");
                        callback(null, "Reminder already Added");
                    }
                }

                else {
                    //if email or title are invalid
                    callback(null, "email or title invalid");


                }
            }

        })

}

/**
 * @function            searchNoteByTitle
 * 
 * @description         this function is used to search the note using the 
 *                          title oif the  note
 */

 exports.searchNoteByTitle=(body,callback)=>{

    //finding the note by title

    note.find({"email":body.email,"title":body.title},(err,result)=>{
        //if any error while executing the query
        if(err){
            console.log(err);
            callback(err,result);
        }
        else{
            if(result.length===0){
                console.log("no such title exists");
                callback(null,"no such title exists");
            }
            else{
                console.log(result);
                callback(null,result);
                
            }
        }
    })

 }

 /**
 * @function            searchNoteByDescription
 * 
 * @description         this function is used to search the note using the 
 *                          title oif the  note
 */

exports.searchNoteByDescription=(body,callback)=>{

    //finding the note by title

    note.find({"email":body.email,"description":body.description},(err,result)=>{
        //if any error while executing the query
        if(err){
            console.log(err);
            callback(err,result);
        }
        else{
            //if that description is not present in the notes
            if(result.length===0){
                console.log("no such title exists");
                callback(null,"no such title exists");
            }
            //note present with that description
            else{
                console.log(result);
                callback(null,result);
                
            }
        }
    })

 }