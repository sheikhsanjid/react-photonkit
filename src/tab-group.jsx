import React from 'react';
import classNames from 'classnames';
import * as Photon from './photon.jsx';

export default class TabGroup extends Photon.Component {
	constructor(props) {
		super(props);

		this.sortableOptions = {
			ref: 'tabs',
			model: 'children',
			disabled: true
		};

		this.state = {
			activeKey: props.activeKey,
			children: props.children
		}
	}

	renderTab(child, index) {
		const active = this.state.activeKey === child.props.eventKey;
		return React.cloneElement(child, {
			active: active,
			key: `tab-item-${index}`,
			onClick: () => {
				this.setState({
					activeKey: child.props.eventKey
				});

				if (this.props.onSelect) {
					this.props.onSelect(child.props.eventKey);
				}
			}
		});
	}

	renderPane(child) {
		const active = this.state.activeKey === child.props.eventKey;
		if (active) {
			return child.props.children;
		}

		return null;
	}

	componentWillMount() {
		this.sortableOptions.disabled = !this.props.draggable;
		return this.sortableOptions.disabled;
	}

	render() {
		const classes = this.getPtClassSet();
		const className = classNames(this.props.className, classes);

		let childTabs;
		let childPane;

		if (this.state.children) {
		  childTabs = this.state.children.map((child, index) => {
				return this.renderTab(child, index);
			});

			childPane = this.state.children.map((child, index) => {
				return this.renderPane(child, index);
			});
		}

		return (
			<div>
				<div className={className} ref={(c) => this.childTabs = c}>
					{childTabs}
				</div>
				<div ref={(c) => this.childPanes = c}>
					{childPane}
				</div>
			</div>
		);
	}
}

TabGroup.defaultProps = {
	activeKey: '',
	ptClass: 'tab-group',
	draggable: false
};

TabGroup.propTypes = {
	activeKey: React.PropTypes.any,
	onSelect: React.PropTypes.func,
	draggable: React.PropTypes.bool
};
