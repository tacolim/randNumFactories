const fs = require('fs');
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
        const { title, content: tree } = await Tree.findOne({ _id: id }).exec();
        res.json({
          tree,
          title,
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
  
        const { tree, title, factories } = req.body;

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
          title: title || 'Tree_' + dateString,
          factories: factories,
        });
  
        user.trees.push(newTree._id);
        const updateUser = await user.save();
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

        const updatedTree = await Tree.findByIDAndUpdate(
          { _id: req.params.TreeId }, { title: title || 'TreeUpdate_' + dateString, factories: factories }, { new: true }
        );
  
        const updateUser = await user.save();

        res.json({ updatedTree });

      } catch (e) {
        console.log('/tree/edit', e);
        res.status(422).json({ error: 'Failed to edit tree' });
      }
    },
  };
  
  module.exports = TreeController;