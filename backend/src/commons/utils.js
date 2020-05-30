const toExpressError = (res, message) => {
    res.status(500);
    res.json({ error: message });
};

module.exports = {
    toExpressError,
};
