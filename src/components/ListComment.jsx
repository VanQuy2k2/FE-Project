import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export default function ListComment(props) {
  const { listComment, onReply, refComment } = props;
  return (
    <div className="response-area">
      <h2>{listComment.length} RESPONSES</h2>
      <ul className="media-list">
        {listComment &&
          listComment
            .filter((i) => i.id_comment === 0)
            .map((item, index, arr) => {
              const d = dayjs(item.updated_at).tz('Asia/Ho_Chi_Minh');
              const time = d.format('h:mm A');
              const date = d.format('MMM D, YYYY').toUpperCase();
              const isLast = index === 0;
              return (
                <div key={item.id}>
                  <li className="media" ref={isLast ? refComment : null}>
                    <a className="pull-left" href="#">
                      <img
                        src={`http://localhost/laravel8/laravel8/public/upload/user/avatar/${item.image_user}`}
                        alt=""
                        className="media-object"
                      />
                    </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li>
                          <i className="fa fa-user"></i>
                          {item.name_user}
                        </li>
                        <li>
                          <i className="fa fa-clock-o"></i>
                          {time}
                        </li>
                        <li>
                          <i className="fa fa-calendar"></i>
                          {date}
                        </li>
                      </ul>
                      <p>{item.comment}</p>
                      <button onClick={() => onReply(item.id)} className="btn btn-primary">
                        <i className="fa fa-reply"></i>Replay
                      </button>
                    </div>
                  </li>
                  {listComment
                    .filter((i) => i.id_comment === item.id)
                    .map((item, index) => {
                      const d = dayjs(item.updated_at).tz('Asia/Ho_Chi_Minh');
                      const time = d.format('h:mm A');
                      const date = d.format('MMM D, YYYY').toUpperCase();
                      const isLast = index === 0;
                      return (
                        <li key={item.id} className="media second-media">
                          <a className="pull-left" href="#">
                            <img
                              className="media-object"
                              src={`http://localhost/laravel8/laravel8/public/upload/user/avatar/${item.image_user}`}
                              alt=""
                            />
                          </a>
                          <div className="media-body">
                            <ul className="sinlge-post-meta">
                              <li>
                                <i className="fa fa-user"></i>
                                {item.name_user}
                              </li>
                              <li>
                                <i className="fa fa-clock-o"></i>
                                {time}
                              </li>
                              <li>
                                <i className="fa fa-calendar"></i>
                                {date}
                              </li>
                            </ul>
                            <p>{item.comment}</p>
                            <button onClick={() => onReply(item.id)} className="btn btn-primary">
                              <i className="fa fa-reply"></i>Replay
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </div>
              );
            })}
        {/* <li className="media second-media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={man_three} alt=""/>
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                            <li className="media second-media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={man_three} alt=""/>
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                            <li className="media second-media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={man_three} alt=""/>
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                            <li className="media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={man_four} alt=""/>
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                            <li className="media second-media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={man_three} alt=""/>
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                            <li className="media second-media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={man_three} alt=""/>
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                            <li className="media second-media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={man_three} alt=""/>
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <a className="btn btn-primary" href=""><i className="fa fa-reply"></i>Replay</a>
                                </div>
                            </li> */}
      </ul>
    </div>
  );
}
