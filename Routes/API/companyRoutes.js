const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/CRUD/companyController'); // Adjust the path as necessary

// Add a new company
router.post('/add', companyController.addCompany);

// Add a new record to an existing company
router.post('/:id/records/add', companyController.addRecord);

// Delete a company by ID
router.delete('/delete/:id', companyController.deleteCompany);

// Update a company by ID
router.put('/update/:id', companyController.updateCompany);

// Get all company names
router.get('/names', companyController.getAllCompanyNames);

// Get company details by ID
router.get('/:id', companyController.getCompanyById);

// Update a record within a company
router.put('/:companyId/records/:recordId', companyController.updateRecord);

module.exports = router;
