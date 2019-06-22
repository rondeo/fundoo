/**
 * @param       {noteService}
 * 
 * @description importing the services written in the services
 */
const noteService = require('../services/noteService');

/**
 * @function        addNote
 * 
 * @description      this function is used to add the note
 */

exports.addNote = (req, res) => {
    // console.log(req.body.payload.email);
    //setting the required data
    data = {
        "email": req.body.payload.email,
        "title": req.body.title,
        "description": req.body.description

    }
    //calling the addNote service 
    noteService.addNote(data, (err, result) => {
        //if any error in seervices
        if (err) {
            console.log(err);
            res.send(err)

        }
        else {
            console.log(result);
            res.send(result);
        }
    })
}

/**
 * @function            noteArchive
 * 
 * @description         this function is use to archive the note
 */
exports.noteArchive = (req, res) => {
    //data required to archive the note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    //calling the service to archive the note
    noteService.noteArchive(data, (err, result) => {
        //if error in the service
        if (err) {
            console.log(err);
            res.send(err);
        }
        // if no error in the service
        else {
            console.log(result);
            res.send(result);
        }
    })
}

/**
 * @function        noteDelete
 * 
 * @description     this function is used delete the note 
 */
exports.noteDelete = (req, res) => {
    //data required to delete the note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }

    //calling the service to delete the note
    noteService.noteDelete(data, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
}

/**
 * @function        getAllNotes
 * 
 * @description     this function is used to getAll the notes 
 */
exports.getAllNotes = (req, res) => {
    //data required to getAllNotes 
    data = {
        "email": req.body.payload.email

    }
    //calling the getAllNotes services
    noteService.getAllNotes(data, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
}

/**
 * @function        restore
 * 
 * @description     this function is used to restore the deleted note
 */
exports.restore = (req, res) => {
    //required data restore the deleted note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    //calling the restore service 
    noteService.restore(data, (err, result) => {

        if (err) {
            console.log("in controller");
            res.send(err)
        }
        else {
            console.log(result + "in controller");
            res.send(result);
        }
    })
}
/**
 * @function            noteReminder
 * @description         this function is used set reminder to note
 */
exports.noteReminder = (req, res) => {
    //data required Reminder to note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    //calling the reminder service
    noteService.noteReminder(data, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
}

/**
 * @function        searchNoteByTitle
 * 
 * @description     this function is used to search the note by title
 */
exports.searchNoteByTitle=(req,res)=>{
    data={
        "email":req.body.payload.email,
        "title":req.body.title
    }

    //calling the searchNoteByTitle  services
    noteService.searchNoteByTitle(data,(err,result)=>{
        if(err){
            console.log(err);
            res.send("some error in the controller")
        }
        else{
            console.log(result);
            
            res.send(result);
        }
    })
}
/**
 * @function        searchNoteByDescription
 * 
 * @description     this function is used to search the note by title
 */
exports.searchNoteByDescription=(req,res)=>{
    data={
        "email":req.body.payload.email,
        "description":req.body.description
    }

    //calling the searchNoteByTitle  services
    noteService.searchNoteByDescription(data,(err,result)=>{
        if(err){
            console.log(err);
            res.send("some error in the controller")
        }
        else{
            console.log(result);
            
            res.send(result);
        }
    })
}