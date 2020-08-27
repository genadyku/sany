const Counter = require('../models/counter');
const APIFeatures = require('../utils/apiFeatures');

exports.getCounters = async (req, res, next) => {
  const features = new APIFeatures(Counter.find(), req.query);
  const counters = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      counters,
    },
  });
};

exports.incCounters = async (req, res, next) => {
  let Count;
  /*
  const features = new APIFeatures(Counter.findOne(), req.query);
  const counters = await features.query;
  */
  Count = await Counter.findOne().exec();
  console.log('srv-count', Count);

  let { count } = Count;
  console.log('srv-count1', count);
  count = Number.parseInt(count);
  count += 1;
  console.log('srv-count2', count);
  /*
  Counter.findOneAndUpdate(
    { _id: Count._id },
    { $set: { count: count } },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send('Succesfully saved.');
    }
  );
  */

  try {
    await Counter.findOneAndUpdate(
      { _id: Count._id },
      { $set: { count: count } },
      { upsert: true }
    );
  } catch (err) {
    res.send(500, { error: err });
  }

  return res.send('Succesfully saved.');
};
