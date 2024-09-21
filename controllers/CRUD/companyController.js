const Company = require('../../models/Companies');

// Add a new company
exports.addCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a new record to an existing company
exports.addRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    company.records.push(req.body);
    const updatedCompany = await company.save();
    res.status(201).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a company by ID
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all company names
exports.getAllCompanyNames = async (req, res) => {
  try {
    const companies = await Company.find({}, 'name');
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get company details by ID
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a record within a company
exports.updateRecord = async (req, res) => {
  try {
    const { companyId, recordId } = req.params;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const record = company.records.id(recordId);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    Object.assign(record, req.body); // Update record fields
    await company.save(); // Save updated company document

    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
