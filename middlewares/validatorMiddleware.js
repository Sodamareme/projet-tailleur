// import { body, validationResult } from 'express-validator';

// const validatePost = [

//   body('content')
//     .trim()
//     .isLength({ min: 1 }).withMessage('Le titre est requis')
//     .isLength({ max: 100 }).withMessage('Le titre ne doit pas dépasser 100 caractères'),
//   body('description')
//     .trim()
//     .isLength({ min: 1 }).withMessage('Le contenu est requis')
//     .isLength({ max: 500 }).withMessage('Le contenu ne doit pas dépasser 500 caractères'),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array()[0].msg });
//     }
//     next();
//   }
  
// ];


// // const validateUser = [
// //     body('username')
// //       .trim()
// //       .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit contenir au moins 3 caractères')
// //       .isLength({ max: 30 }).withMessage('Le nom d\'utilisateur ne doit pas dépasser 30 caractères')
// //       .matches(/^[a-zA-Z0-9_]+$/).withMessage('Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres et des underscores'),
// //     body('email')
// //       .trim()
// //       .isEmail().withMessage('Email invalide')
// //       .normalizeEmail(),
// //     body('password')
// //       .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
// //       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
// //       .withMessage('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'),
// //     (req, res, next) => {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array()[0].msg });
// //       }
// //       next();
// //     }
// //   ];


// // const validateComment
// const validateComment = [
//   check('content')
//       .notEmpty().withMessage('Content is required')
//       .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters'),
//   check('postId')
//       .notEmpty().withMessage('Post ID is required')
//       .isMongoId().withMessage('Invalid Post ID'),
//   (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//   }
// ];

// export default  validatePost;validateComment;

import { body, check, validationResult } from 'express-validator';

const validatePost = [
  body('content')
    .trim()
    .isLength({ min: 1 }).withMessage('Le contenu est requis')
    .isLength({ max: 100 }).withMessage('Le contenu ne doit pas dépasser 100 caractères'),
  body('description')
    .trim()
    .isLength({ min: 1 }).withMessage('La description est requise')
    .isLength({ max: 500 }).withMessage('La description ne doit pas dépasser 500 caractères'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateComment = [
  check('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters'),
  check('postId')
    .notEmpty().withMessage('Post ID is required')
    .isMongoId().withMessage('Invalid Post ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  }
];

export { validatePost, validateComment };


