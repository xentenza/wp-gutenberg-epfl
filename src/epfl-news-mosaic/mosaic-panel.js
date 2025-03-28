import { image } from '@wordpress/icons';

import cardIcon from './mosaic-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    MediaUpload,
    InnerBlocks,
} = wp.blockEditor;

const {
    PanelBody,
    TextControl,
    Placeholder,
    Button,
    RadioControl,
    ToggleControl,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

const getAttributes = () => {
    let atts = {
            distinction: {
                type: 'boolean',
                default: false,
            },
            motcle: {
                type: 'string'
            },
            title: {
                type: 'string'
            },
            link: {
                type: 'string'
            },
            url: {
                type: 'string'
            },
            imageId: {
                type: 'integer'
            },
            imageUrl: {
                type: 'string'
            },
            content: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            displayType: {
                type: 'string',  // 'news', 'breve', 'image', 'video', 'dossier'
                default: 'news'
            },
            displaySize: {
                type: 'string',  // 'small', 'medium', 'large'
                default: 'small'
            }
        };

    return atts;
}

registerBlockType( 'epfl/mosaic-panel', {
	title: __( 'EPFL News Mosaic', 'epfl'),
	description: 'v1.0.0',
	icon: cardIcon,
    category: 'common',
    parent: ['epfl/mosaic'],
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        let isSelected = ! attributes.imageId || ! attributes.imageUrl;

        function onImageSelect(imageObject) {
            setAttributes({
				imageUrl: imageObject.url,
				imageId: imageObject.id
			})
        }

        function onRemoveImage() {
            props.setAttributes({
              imageId: null,
              imageUrl: null,
            })
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p>Choix individuels, bloc par bloc</p>
                    <PanelBody title='Format'>
                        <RadioControl
                            label={ __('Type de news', 'epfl') }
                            selected={ attributes.displayType }
                            options={ [
                                { label: 'News', value: 'news' },
                                { label: 'Brève', value: 'breve' },
                                { label: 'Image', value: 'image' },
                                { label: 'Vidéo', value: 'video' },
                                { label: 'Dossier', value: 'dossier' },
                            ] }
                            onChange={ ( displayType ) => setAttributes( { displayType } ) }
                        />
                        <RadioControl
                            label={ __('largeur', 'epfl') }
                            selected={ attributes.displaySize }
                            options={ [
                                { label: '1/3', value: 'small' },
                                { label: '2/3', value: 'medium' },
                                { label: 'Pleine largeur', value: 'large' },
                            ] }
                            onChange={ ( displaySize ) => setAttributes( { displaySize } ) }
                        />
                    </PanelBody>
                </InspectorControls>

                <div className={ className }>
                    <h4>
                        { __('Mosaic Card', 'epfl') }:
                        { 
                            attributes.displayType === 'news' ? ' News' :
                            attributes.displayType === 'breve' ? ' Brève' :
                            attributes.displayType === 'image' ? ' Image' :
                            attributes.displayType === 'video' ? ' Vidéo' :
                            attributes.displayType === 'dossier' ? ' Dossier' :
                            '' 
                        }
                    </h4>

                    { attributes.displayType === "dossier" &&
                        <TextControl
                            label={ __('Mot-clé (mandatory)', 'epfl') }
                            value={ attributes.motcle }
                            onChange={ motcle => setAttributes( { motcle } ) }
                        />
                    }

                    { (attributes.displayType === "breve" || attributes.displayType === "dossier") &&
                        <TextControl
                            label={ __('Title (mandatory)', 'epfl') }
                            value={ attributes.title }
                            onChange={ title => setAttributes( { title } ) }
                        />
                    }

                    { (attributes.displayType === "breve" || attributes.displayType === "image") &&
                        <TextareaControl
                            label={ __('Description', 'epfl')}
                            value={ attributes.description }
                            onChange={ description => setAttributes( { description } ) }
                        />
                    }

                    { (attributes.displayType === "breve" || attributes.displayType === "dossier") &&
                        <TextControl
                            label={ __('Link', 'epfl') }
                            value={ attributes.link }
                            onChange={ link => setAttributes( { link } ) }
                        />
                    }

                    { attributes.displayType === "breve" &&
                        <ToggleControl
                            label={ __('Distinction', 'epfl') }
                            checked={ attributes.distinction  }
                            onChange={ distinction  => setAttributes( { distinction } ) }
                        />
                    }

                    { attributes.displayType === "video" &&
                        <TextControl
                            label={ __('URL of the video', 'epfl') }
                            value={ attributes.url }
                            onChange={ url => setAttributes( { url } ) }
                            help={ __('You can paste a Mediaspace, YouTube or Vimeo URL', 'epfl') }
                        />
                    }

                    { (attributes.displayType === "image" || attributes.displayType === "dossier") ? (
                         isSelected ? (
                            <MediaUpload
                                onSelect={ onImageSelect }
                                type="image"
                                value={ attributes.imageId }
                                render={ ( { open } ) => (
                                    <Placeholder
                                        icon={ image }
                                        label={ __("Image", 'epfl') }
                                    >
                                        <Button
                                            onClick={ open }
                                            isPrimary={ true }
                                        >
                                            { __('Upload', 'epfl') }
                                        </Button>
                                    </Placeholder>
                                )}
                            />
                            ) : (
                                <p className="epfl-uploader-image-wrapper">
                                <img
                                    src={ attributes.imageUrl }
                                    alt={ attributes.imageUrl }
                                    className="epfl-uploader-img"
                                />

                                { props.attributes.imageUrl && (

                                <Button
                                    className={'epfl-uploader-remove-image'}
                                    onClick={ onRemoveImage }
                                    icon="dismiss"
                                >
                                    { __('Remove image', 'epfl') }
                                </Button>

                                ) }
                                </p>
                            )
                    ): null }


                </div>
            </Fragment>
		)
	},
	save: ( props ) => {

		return (<InnerBlocks.Content /> );
	},
} );
