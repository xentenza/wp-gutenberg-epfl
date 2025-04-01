import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import cardIcon from './mosaic-icon'
import './mosaic-panel'

const version = "v1.0.0";

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.blockEditor;

const {
    PanelBody,
    ToggleControl,
    RadioControl,
} = wp.components;

const { Fragment } = wp.element;

const TEMPLATE = [
	['epfl/mosaic-panel', {}, [] ],
    ['epfl/mosaic-panel', {}, [] ],
    ['epfl/mosaic-panel', {}, [] ],
]

const getAttributes = () => {
    let atts = {
        grayWrapper: {
            type: 'boolean',
            default: false,
        },
        displayType: {
            type: 'string',  // 'large', 'full'
            default: 'full'
        },
    };

    return getTooltippedAttributes(atts);
}

registerBlockType( 'epfl/mosaic-deck', {
	title: __( 'EPFL News Mosaic', 'epfl'),
    description: __(
        'Create a mosaic of different news formats',
        'epfl'
    ),
	icon: cardIcon,
    category: hasCommonCategory ? 'common' : 'design',
	attributes: getAttributes(),
    example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        if ( attributes.asToolTip ) {
            // render the tooltip
            return (
                <Fragment>
                    <img src={ blockThumbnails.cardDeck } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('#', 'epfl') } target="new">{ __('Online help coming soon...', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                </InspectorControls>
                <div className={ className }>
                        <h2 className="epfl-block-title">{ __('EPFL News Mosaic', 'epfl') }</h2>
                        <InnerBlocks allowedBlocks={ ['epfl/mosaic-panel'] } />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return (
                <InnerBlocks.Content />

        );
	},
} );
