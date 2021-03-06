import React, { ChangeEvent, FormEvent } from 'react';
import { ApiAuthInterface } from '../lib/api-auth.service';
import { getCourse } from '../lib/api-public.service';
import { AppContext } from '../state';
import { coursesActions } from '../state/reducers/coursesReducer';
import { userActions } from '../state/reducers/userReducer';
import { colors } from './GlobalStyles';
import {
  difficultyLabels,
  qualityLabels,
  timeChartLabels,
} from '../lib/utils';

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

  deleteHandler = async (event: any) => {
    event.preventDefault();
    const {
      apiAuth,
      cid,
      uid,
      closeModalHandler,
    } = this.props;

    await apiAuth.deleteVote(cid, uid);
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
        type: userActions.DELETE_VOTE,
        payload: { cid },
      });
    }

    closeModalHandler();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
                <span>{timeChartLabels[0]}</span>
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
                <span>{timeChartLabels[1]}</span>
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
                <span>{timeChartLabels[2]}</span>
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
                <span>{timeChartLabels[3]}</span>
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
                <span>{difficultyLabels[0]}</span>
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
                <span>{difficultyLabels[1]}</span>
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
                <span>{difficultyLabels[2]}</span>
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
                <span>{difficultyLabels[3]}</span>
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
                <span>{difficultyLabels[4]}</span>
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
                <span>{qualityLabels[0]}</span>
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
                <span>{qualityLabels[1]}</span>
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
                <span>{qualityLabels[2]}</span>
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
                <span>{qualityLabels[3]}</span>
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
                <span>{qualityLabels[4]}</span>
              </label>
            </div>
          </div>
          <div className={'form-actions'}>
            <input
              type="submit"
              value="Submit"
              className={
                'link link--border link--smaller-font'
              }
            />
            {this.props.votes && (
              <button
                className={'link link--smaller-font delete'}
                onClick={this.deleteHandler.bind(this)}
              >
                Remove rating
              </button>
            )}
          </div>
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

          .form-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          }

          .form-actions .delete {
            color: ${colors.b};
          }
        `}</style>
      </div>
    );
  }
}

export default FormVote;
