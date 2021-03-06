import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

// local modules - custom error
import AppError from 'utils/error';

// local modules - models
import UserModel from 'services/user/model';

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser(async (email, done) => {
  try {
    const user = await UserModel.findOne({ email }, '-password');
    if (!user) {
      done(new AppError('AuthError', 401, 'Account has been deleted', true));
      return;
    }
    if (user.status !== 'Active') {
      done(new AppError('AuthError', 401, 'Account is not active', true));
      return;
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

// use the local strategy for login
passport.use('local-login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const error = new AppError('AuthError', 400, 'Invalid email and/or password', true);
    try {
      // get user
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(error);
      }

      if (user.status === 'Unverified') {
        return done(new AppError('EmailNotVerifiedError', 400, 'Email is not verified', true));
      }

      // compare passwords
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return done(error);
      }

      return done(null, user);
    } catch (err) {
      return done(new AppError(err.name, 400, err.message, true));
    }
  },
));

// use the local strategy for sign-up
passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'email',
  },
  async (email, password, done) => {
    const error = new AppError('AuthError', 400, 'Invalid email and/or password', true);
    try {
      // get user and update status
      const user = await UserModel.findOneAndUpdate({ email }, { status: 'Active' }, { new: true, runValidators: true });
      if (!user) {
        return done(error);
      }

      return done(null, user);
    } catch (err) {
      return done(new AppError(err.name, 400, err.message, true));
    }
  },
));

export default passport;
