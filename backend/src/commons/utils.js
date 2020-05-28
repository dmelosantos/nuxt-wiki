const toExpressError = (res, message) => {
    res.status(500);
    res.json({ error: err.message });
};

module.exports = {
    toExpressError,
};
