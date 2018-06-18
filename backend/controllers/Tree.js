const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Tree = require('../models/tree');

const SECRET = process.env.APP_SECRET;

const TreeController = {
    async get(req, res) {
      try {
        const authToken = req.headers.authorization.replace('Bearer ', '');
        const { id } = req.params;
  
        const decodedToken = await jwt.verify(authToken, SECRET);
        const { username } = decodedToken;
        const user = await User.findOne({ username }).exec();
        const { title, factories } = await Tree.findOne({ _id: id }).exec();
        res.json({
          title,
          factories
        });
      } catch (e) {
        console.log('get tree: ', e);
        res.status(422).json({ error: 'Failed to get tree' });
      }
    },
    async getAll(req, res) {
      try {
        const authToken = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = await jwt.verify(authToken, SECRET);
        const { username } = decodedToken;
        const user = await User.findOne({ username }).exec();
        const id = user._id;
  
        const trees = await Tree.find({ author: id }).exec();
        res.json(trees);
      } catch (e) {
        res.status(422).json({ trees: [] });
      }
    },
    async create(req, res) {
      try {
        const authToken = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = await jwt.verify(authToken, SECRET);
        const { username } = decodedToken;
        const user = await User.findOne({ username }).exec();
        const id = user._id;
  
        const { title, factories } = req.body;

        date = new Date(Date.now());
        datevalues = [
           date.getFullYear(),
           date.getMonth()+1,
           date.getDate(),
           date.getHours(),
           date.getMinutes(),
           date.getSeconds(),
        ];
        dateString = datevalues.join('-');
  
        const newTree = await Tree.create({
          author: id,
          title: title || 'TreeCreated_' + dateString,
          factories: factories,
        });
  
        user.trees.push(newTree._id);
        res.json({
          id: newTree._id,
          tree: newTree,
        });
      } catch (e) {
        console.log('/tree/create', e);
        res.status(422).json({ error: 'Failed to create tree' });
      }
    },
    async edit(req, res) {
      try {
        const authToken = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = await jwt.verify(authToken, SECRET);
        const { username } = decodedToken;
        const user = await User.findOne({ username }).exec();
  
        const { title, factories } = req.body;

        date = new Date(Date.now());
        datevalues = [
           date.getFullYear(),
           date.getMonth()+1,
           date.getDate(),
           date.getHours(),
           date.getMinutes(),
           date.getSeconds(),
        ];
        dateString = datevalues.join('-');

        const { id } = req.params;

        const updatedTree = await Tree.findOneAndUpdate(
          { _id: id }, { title: title || 'TreeUpdate_' + dateString, factories: factories }, { new: true }
        ).exec();

        res.json({ updatedTree });

      } catch (e) {
        console.log('/tree/edit', e);
        res.status(422).json({ error: 'Failed to edit tree' });
      }
    },
    async delete(req, res) {
      try {
        const id = req.params.id;

        const deletedTree = await Tree.findOneAndRemove({ _id: id });

        res.json({ deletedTree });

      } catch (e) {
        console.log('/tree/delete', e);
        res.status(422).json({ error: 'Failed to delete tree' });
      }
    },
  };
  
  module.exports = TreeController;