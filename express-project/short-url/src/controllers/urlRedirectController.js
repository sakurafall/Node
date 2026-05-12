import URLRecord from '../models/urlRecordModel.js';

export async function getOriginURL(req, res) {
  const { urlCode } = req.params;

  // If urlCode is not provided
  if (!urlCode) {
    return res.status(400).json({ message: 'URL code is required' });
  }

  // If urlCode is not found
  const urlRecord = await URLRecord.findOne({ where: { urlCode } });
  if (!urlRecord) {
    return res.status(404).json({ message: 'URL code not found' });
  }

  return res.status(200).json({ message: 'Success', data: urlRecord.originURL });
}