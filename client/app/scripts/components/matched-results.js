import React from 'react';
import { connect } from 'react-redux';

import MatchedText from './matched-text';

const SHOW_ROW_COUNT = 2;
const MAX_MATCH_LENGTH = 24;

class MatchedResults extends React.Component {

  renderMatch(matches, field) {
    const match = matches.get(field);
    const text = match.text;

    return (
      <div className="matched-results-match" key={match.label}>
        <div className="matched-results-match-wrapper">
          <span className="matched-results-match-label">
            {match.label}:
          </span>
          <MatchedText text={text} match={match} maxLength={MAX_MATCH_LENGTH} />
        </div>
      </div>
    );
  }

  render() {
    const { matches, style } = this.props;

    if (!matches) {
      return null;
    }

    let moreFieldMatches;
    let moreFieldMatchesTitle;
    if (matches.size > SHOW_ROW_COUNT) {
      moreFieldMatches = matches
        .valueSeq()
        .skip(SHOW_ROW_COUNT)
        .map(field => field.label);
      moreFieldMatchesTitle = `More matches:\n${moreFieldMatches.join(',\n')}`;
    }

    return (
      <div className="matched-results" style={style}>
        {matches.keySeq().take(SHOW_ROW_COUNT).map(fieldId => this.renderMatch(matches, fieldId))}
        {moreFieldMatches && <div className="matched-results-more" title={moreFieldMatchesTitle}>
          {`${moreFieldMatches.size} more matches`}
        </div>}
      </div>
    );
  }
}

export default connect()(MatchedResults);
