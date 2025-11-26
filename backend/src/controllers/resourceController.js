const Resource = require('../models/Resource');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

exports.listResources = asyncHandler(async (_req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json({ data: resources });
});

exports.createResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create(req.body);
  res.status(201).json({ data: resource });
});

exports.updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!resource) {
    throw new ApiError(404, 'Resource not found');
  }

  res.json({ data: resource });
});

exports.deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);

  if (!resource) {
    throw new ApiError(404, 'Resource not found');
  }

  res.status(204).send();
});

