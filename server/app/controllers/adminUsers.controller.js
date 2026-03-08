const User = require('../models/user.model');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Toggle user ban status
exports.toggleBan = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Prevent admin from banning themselves
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot ban yourself" });
        }

        user.isBanned = !user.isBanned;
        await user.save();
        res.status(200).json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully`, user });
    } catch (error) {
        res.status(500).json({ message: "Error toggling ban status", error: error.message });
    }
};

// Toggle user role
exports.toggleRole = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot change your own role" });
        }

        user.role = user.role === 'admin' ? 'user' : 'admin';
        await user.save();
        res.status(200).json({ message: `User role updated to ${user.role}`, user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role", error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot delete yourself" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
