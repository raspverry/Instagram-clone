import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'


const Post = ({post}) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{marginHorizontal: 15, marginTop: 10}}>
                <PostFooter />
                <Likes post={post} />
                <Caption post={post}/>
                <CommentsSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({post}) => (
    <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: 5, 
        alignItems: 'center'
        }}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{ uri: post.profile_picture}} style={styles.story} />
            <Text style={{color: 'white', marginLeft: 5, fontWeight: '700'}}>{post.user}</Text>
        </View>

        <Text style={{color: 'white', fontWeight: '900'}}>...</Text>
    </View>
)


const PostImage = ({post}) => (
    <View style={{
        width: '100%',
        height: 450,
    }}>
        <Image 
            source={{uri: post.imageurl}} 
            style={{height: '100%', resizeMode: 'cover'}} 
        />
    </View>
)

const postFooterIcons = [
    {
        name: 'Like',
        imageurl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-like-instagram-flatart-icons-outline-flatarticons.png',
        likedImageurl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ff0000/external-like-instagram-flatart-icons-outline-flatarticons.png'
    },
    {
        name: 'Comment',
        imageurl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-chat-instagram-flatart-icons-outline-flatarticons.png'
    },
    {
        name: 'Share',
        imageurl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-send-instagram-flatart-icons-outline-flatarticons.png'
    },
    {
        name: 'Save',
        imageurl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-bookmark-instagram-flatart-icons-outline-flatarticons.png'
    }
]

const PostFooter = () => (
    <View style={{flexDirection: 'row' }}>
        <View style={styles.LeftFooterIconsContainer}>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageurl} />
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageurl} />
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageurl} />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageurl} />
        </View>
    </View>
)

const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl}} />
    </TouchableOpacity>
)

const Likes = ({post}) => (
    <View style={{flexDirection: 'row', marginTop: 4}}>
        <Text style={{color: 'white', fontWeight: '600'}}>{post.likes.toLocaleString('en')} Likes</Text>
    </View>
)

const Caption = ({post}) => (
    <View style={{marginTop: 5}}>
        <Text style={{color: 'white'}}>
            <Text style={{fontWeight: '600'}}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentsSection = ({post}) => (
    <View style={{ marginTop: 5}}>
        {!!post.comments.length && (
            <Text style={{color: 'gray'}}>
                View {post.comments.length > 1 ? 'all ' : ' '}{post.comments.length}{" "}
                {post.comments.length > 1 ? 'Comments' : 'Comment'}
            </Text>
        )}
    </View>
)

const Comments =({post}) => (
    <>
    {post.comments.map((comment, index) => (
        <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'white'}}>
                <Text style={{fontWeight: '600'}}>{comment.user} </Text>
                {comment.comment}
            </Text>
        </View>
    ))}
    </>
)

const styles = StyleSheet.create({
    story:{
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: '#ff8501'
    },
    footerIcon: {
        width: 33, 
        height: 33,
        tintColor: 'white'
    },
    LeftFooterIconsContainer:{
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'
    }
})

export default Post
