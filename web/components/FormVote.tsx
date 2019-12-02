import React, { ChangeEvent, FormEvent } from 'react';
import { ApiAuthInterface } from '../lib/api-auth.service';
import { getCourse } from '../lib/api-public.service';
import { AppContext } from '../state';
import { coursesActions } from '../state/reducers/coursesReducer';
import { userActions } from '../state/reducers/userReducer';

export interface VotingCategoriesInterface {
  quality: number | null;
  difficulty: number | null;
  time: number | null;
}

interface FormVoteProps {
  apiAuth: ApiAuthInterface;
  cid: number;
  uid: string;
  votes: VotingCategoriesInterface;
  closeModalHandler: () => void;
}

class FormVote extends React.Component<
  FormVoteProps,
  VotingCategoriesInterface
> {
  static contextType = AppContext;

  state: VotingCategoriesInterface = {
    quality: this.props.votes
      ? this.props.votes.quality
      : null,
    difficulty: this.props.votes
      ? this.props.votes.difficulty
      : null,
    time: this.props.votes ? this.props.votes.time : null,
  };

  handleOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    this.setState({ [name as 'quality']: +value });
  };

  handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const {
      apiAuth,
      cid,
      uid,
      votes, // previous feedback
    } = this.props;
    const type = votes ? 'put' : 'post';
    const { quality, difficulty, time } = this.state;

    if (
      quality !== null &&
      difficulty !== null &&
      time !== null
    ) {
      await apiAuth
        .voteForCourse(
          cid,
          uid,
          { quality, difficulty, time },
          type
        )
        .catch(err => err.response);

      const course = await getCourse(cid);

      if (course.data) {
        const [{}, dispatch] = this.context;
        const {
          qualities,
          time: courseTimes,
          difficulties,
        } = course.data;

        dispatch({
          type: coursesActions.UPDATE_FEEDBACK,
          payload: {
            cid,
            qualities,
            time: courseTimes,
            difficulties,
          },
        });

        dispatch({
          type: userActions.UPDATE_VOTE,
          payload: { cid, quality, difficulty, time },
        });
      }

      this.props.closeModalHandler();
    }
  };

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <div className={'radio-section'}>
            <p className={'radio-section-heading'}>
              Time commitment (weekly):
            </p>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="time"
                  value="0"
                  checked={this.state.time === 0}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                  required
                />
                <span>0-10</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="time"
                  value="1"
                  checked={this.state.time === 1}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>10-20</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="time"
                  value="2"
                  checked={this.state.time === 2}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>20-30</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="time"
                  value="3"
                  checked={this.state.time === 3}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>30+</span>
              </label>
            </div>
          </div>

          <div className={'radio-section'}>
            <p className={'radio-section-heading'}>
              Difficulty:
            </p>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="0"
                  checked={this.state.difficulty === 0}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                  required
                />
                <span>It's a joke.</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="1"
                  checked={this.state.difficulty === 1}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Easy</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="2"
                  checked={this.state.difficulty === 2}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Average</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="3"
                  checked={this.state.difficulty === 3}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Difficult</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="4"
                  checked={this.state.difficulty === 4}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Extremely difficult</span>
              </label>
            </div>
          </div>

          <div className={'radio-section'}>
            <p className={'radio-section-heading'}>
              Quality:
            </p>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="quality"
                  value="0"
                  checked={this.state.quality === 0}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                  required
                />
                <span>Abysmal</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="quality"
                  value="1"
                  checked={this.state.quality === 1}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Bad</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="quality"
                  value="2"
                  checked={this.state.quality === 2}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Average</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="quality"
                  value="3"
                  checked={this.state.quality === 3}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Good</span>
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="quality"
                  value="4"
                  checked={this.state.quality === 4}
                  onChange={this.handleOptionChange}
                  className="form-check-input"
                />
                <span>Awesome!</span>
              </label>
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className={'button mt-30'}
          />
        </form>
        <style jsx>{`
          .radio-section {
            margin-bottom: 20px;
          }

          .radio-section-heading {
            margin-bottom: 10px;
            font-weight: bold;
          }

          .form-check {
            margin-bottom: 5px;
          }
          .form-check span {
            display: inline-block;
            margin-left: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default FormVote;
