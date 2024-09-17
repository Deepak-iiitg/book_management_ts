import {addBook,deleteBook,updateBook,getAllBook,filterBookByNameOrAuthorName,searchBook} from '../controllers/bookControllers';
import express from 'express';
import tokenMatch from '../middleware/routeProtect';

const router = express.Router();
router.post('/',tokenMatch,addBook);
router.delete('/:_id',tokenMatch,deleteBook);
router.patch('/:_id',tokenMatch,updateBook);
router.get('/:pageNo',tokenMatch,getAllBook);
router.get('/filter/:pageNo',tokenMatch,filterBookByNameOrAuthorName);
router.get('/search/:pageNo',tokenMatch,searchBook);

export default router;